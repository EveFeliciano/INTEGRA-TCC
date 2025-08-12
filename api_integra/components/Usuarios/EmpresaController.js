const conexao = require('../../db/conexao');
const bcrypt = require('bcrypt');
const emailController = require('../EmailController');

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

  bcrypt.hash(senha, 10, (err, hash) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha.' });

      // Primeiro insere o endereço
      conexao.query('INSERT INTO endereco (cep) VALUES (?)', [cep], (err, resultadoEndereco) => {
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

  
module.exports = {GetAllEmpresas, InserirEmpresa}