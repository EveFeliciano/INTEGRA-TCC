const conexao = require('../../db/conexao');
const bcrypt = require('bcrypt');

function GetAllCoordenadores(res){
    conexao.query('SELECT * FROM coordenador', (err, resultados) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar coordenadores' });
    }
    
    const coordenadorSemSenha = resultados.map(coordenador => {
      delete coordenador.senha;
      return coordenador;
    });

    res.json(coordenadorSemSenha);
  });
}

function InserirCoordenador(req, res) {
    const { matricula, nome, email, senha } = req.body;
  
    if (!matricula || !nome || !email || !senha) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
    }
  
    const sql = `
      INSERT INTO coordenador (matricula, nome, email, senha)
      VALUES (?, ?, ?, ?)
    `;
  
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha.' });
      conexao.query(sql, [matricula, nome, email, hash], (err, resultado) => {
          if (err) {
              console.error('Erro ao inserir coordenador:', err);
              return res.status(500).json({ erro: 'Erro ao inserir coordenador.' });
          }
  
          res.status(201).json({
          mensagem: 'coordenador cadastrado com sucesso.',
          id_coordenador: resultado.insertId
          });
      }); 
    })
  }

  module.exports = {GetAllCoordenadores, InserirCoordenador}