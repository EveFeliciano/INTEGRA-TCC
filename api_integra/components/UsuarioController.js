const conexao = require('../db/conexao');
const bcrypt = require('bcrypt');

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

function InserirEstudante(req, res) {
  const { rm, nome, curso, modulo_ano, email, senha } = req.body;

  if (!rm || !nome || !curso || !email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
  }

  const sql = `
    INSERT INTO aluno (rm, nome, curso, modulo_ano, email, senha)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha.' });

    conexao.query(sql, [rm, nome, curso, modulo_ano, email, hash], (err, resultado) => {
        if (err) {
        console.error('Erro ao inserir estudante:', err);
        return res.status(500).json({ erro: 'Erro ao inserir estudante.' });
        }

        res.status(201).json({
        mensagem: 'estudante cadastrado com sucesso.',
        id_aluno: resultado.insertId
        });
    }); 
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

function InserirEmpresa(req, res) {
  const { nome, email, telefone, cidade, setor, senha, cnpj, uf, cep } = req.body;

  // Validação básica
  if (!nome || !email || !senha || !cnpj) {
    return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
  }

  const sql = `
    INSERT INTO empresa (nome, email, telefone, cidade, setor, senha, cnpj, uf, cep)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha.' });

    conexao.query(sql, [nome, email, telefone, cidade, setor, hash, cnpj, uf, cep], (err, resultado) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar empresa.' });
      res.status(201).json({ mensagem: 'Empresa cadastrada com sucesso.', id_empresa: resultado.insertId });
    });
  });

}


function DeleteUsuario(req, res) {
  const { id, tipo } = req.body;

  if (!id || !tipo) {
    return res.status(400).json({ erro: 'ID e tipo são obrigatórios.' });
  }

  const tabelasValidas = ['empresa', 'aluno', 'coordenador'];

  if (!tabelasValidas.includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo de usuário inválido.' });
  }

  const campoId = {
    empresa: 'id_empresa',
    aluno: 'id_aluno',
    coordenador: 'id_coordenador'
  }[tipo];

  const sql = `DELETE FROM ${tipo} WHERE ${campoId} = ?`;

  conexao.query(sql, [id], (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao deletar usuário.' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json({ mensagem: `${tipo} deletado com sucesso.` });
  });
}


module.exports = {GetAllEstudantes, GetAllCoordenadores, GetAllEmpresas, DeleteUsuario, InserirEstudante, InserirCoordenador, InserirEmpresa};