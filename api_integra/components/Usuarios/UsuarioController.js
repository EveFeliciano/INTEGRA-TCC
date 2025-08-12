const conexao = require('../../db/conexao');

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


module.exports = {DeleteUsuario};