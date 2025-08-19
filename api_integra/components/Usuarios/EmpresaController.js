const conexao = require('../../db/conexao');
const bcrypt = require('bcrypt');
const emailController = require('../EmailController');
const cepController = require("../CepController");

function GetAllEmpresas(res){
    conexao.query('SELECT * FROM empresa', (err, resultados) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar empresas' });
    }
    
    const empresaSemSenha = resultados.map(empresa => {
      delete empresa.senha;
      return empresa;
    });

    res.json(empresaSemSenha);
  });
}

function InserirEmpresa(req, res) {
  const { nome, email, telefone, setor, cnpj, cep } = req.body;

  if (!nome || !email || !cnpj || !cep) {
      return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
  }

  let senha = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();

  bcrypt.hash(senha, 10, async (err, hash) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha.' });

      const cepInfo = await cepController.procurarCep(cep);
      const logradouro = cepInfo['logradouro'];
      const localidade = cepInfo['localidade'];
      const bairro = cepInfo['bairro'];
      const estado = cepInfo['uf'];
      const complemento = cepInfo['complemento'];

      console.log(cepInfo);
      
      // Primeiro insere o endereço
      conexao.query('INSERT INTO endereco (rua, bairro, cidade, estado, cep, complemento) VALUES (?, ?, ?, ?, ?, ?)', [logradouro, bairro, localidade, estado, cep, complemento], (err, resultadoEndereco) => {
          if (err) {
              console.error('Erro ao inserir endereço:', err);
              return res.status(500).json({ erro: 'Erro ao cadastrar endereço.' });
          }

          const id_endereco = resultadoEndereco.insertId;

          // Depois insere a empresa usando o id_endereco
          const sqlEmpresa = `
              INSERT INTO empresa (nome, email, telefone, data_cadastro, setor, cnpj, senha, id_endereco)
              VALUES (?, ?, ?, current_timestamp(), ?, ?, ?, ?)
          `;

          conexao.query(sqlEmpresa, [nome, email, telefone, setor, cnpj, hash, id_endereco], (err, resultadoEmpresa) => {
              if (err) {
                  console.error('Erro ao inserir empresa:', err);
                  return res.status(500).json({ erro: 'Erro ao cadastrar empresa.' });
              }

              try {
                  emailController.EnviarEmail(email, senha);
              } catch (e) {
                  console.error('Erro ao enviar email:', e);
              }

              res.status(201).json({
                  mensagem: 'Empresa cadastrada com sucesso.',
                  id_empresa: resultadoEmpresa.insertId
              });
          });
      });
  });
}

function AtualizarEmpresa(req, res) {
    const { id_empresa, setor, cnpj, nome, email, telefone} = req.body;

    if (!id_empresa) {
      return res.status(400).json({ erro: 'ID obrigatório não preenchido.' });
    }

    let campos = [];
    let valores = [];

    if (nome) {
      campos.push("nome = ?");
      valores.push(nome);
    }
    if (email) {
      campos.push("email = ?");
      valores.push(email);
    }
    if (telefone) {
      campos.push("telefone = ?");
      valores.push(telefone);
    }
    if (setor) {
      campos.push("setor = ?");
      valores.push(setor);
    }
    if (cnpj) {
      campos.push("cnpj = ?");
      valores.push(cnpj);
    }

    {
      executarUpdate();
    }

    function executarUpdate() {
      if (campos.length === 0) {
        return res.status(400).json({ erro: 'Nenhum campo para atualizar.' });
      }

      const sql = `UPDATE empresa SET ${campos.join(", ")} WHERE id_empresa = ?
      
      `;
      valores.push(id_empresa);

      conexao.query(sql, valores, (err, resultado) => {
        if (err) {
          console.error("Erro ao atualizar empresa:", err);
          return res.status(500).json({ erro: "Erro ao atualizar empresa." });
        }

        if (resultado.affectedRows === 0) {
          return res.status(404).json({ erro: "empresa não encontrada." });
        }

        res.status(200).json({
          mensagem: "empresa atualizada com sucesso.",
          id_empresa,
        });
      });
    }
  }

  
module.exports = {GetAllEmpresas, InserirEmpresa, AtualizarEmpresa}