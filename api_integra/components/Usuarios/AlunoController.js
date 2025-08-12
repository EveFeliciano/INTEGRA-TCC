const conexao = require('../../db/conexao');
const bcrypt = require('bcrypt');
const emailController = require('../EmailController');

function GetAllEstudantes(res){
    conexao.query('SELECT * FROM aluno', (err, resultados) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar alunos' });
    }

    const alunosSemSenha = resultados.map(aluno => {
      delete aluno.senha;
      return aluno;
    });

    res.json(alunosSemSenha);
  });
}

function InserirEstudante(req, res) {
    const { rm, nome, curso, modulo_ano, email, telefone } = req.body;
  
    if (!rm || !nome || !email) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
    }
  
    let senha = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
    console.log(senha);
    const sql = `
      INSERT INTO aluno (nome, email, senha, telefone, data_cadastro, curso, rm, modulo_ano)
      VALUES (?, ?, ?, ?, current_timestamp(), ?, ?, ?)
    `;
  
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha.' });
  
      conexao.query(sql, [nome, email, hash, telefone, curso, rm, modulo_ano], (err, resultado) => {
          if (err) {
            console.error('Erro ao inserir estudante:', err);
            return res.status(500).json({ erro: 'Erro ao inserir estudante.' });
          }
  
          try{
            emailController.EnviarEmail(email, senha);
            console.log(senha);
          }catch(e){
            return res.status(500).json({ erro: 'Erro ao enviar email.' });
          }
          
          res.status(201).json({
            mensagem: 'estudante cadastrado com sucesso.',
            id_aluno: resultado.insertId
          });
      }); 
    });
  }

  module.exports = {InserirEstudante, GetAllEstudantes};