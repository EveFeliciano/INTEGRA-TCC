const express = require('express');
const router = express.Router();
const conexao = require('../db/conexao');

const UsuarioController = require('../components/UsuarioController');

router.get('/api', (req, res) => {
    res.json({mensagem: "Api funcionando!"});
});

router.get('/estudantes', (req, res) => {
    UsuarioController.GetAllEstudantes(res);
});

router.get('/coordenadores', (req, res) => {
    UsuarioController.GetAllCoordenadores(res);
});

router.get('/empresas', (req, res) => {
    UsuarioController.GetAllEmpresas(res);
});

router.post('/inserir-estudante', (req, res) => {
    UsuarioController.InserirEstudante(req, res);
});

router.post('/inserir-coordenador', (req, res) => {
    UsuarioController.InserirCoordenador(req, res);
});

router.post('/inserir-empresa', (req, res) => {
    UsuarioController.InserirEmpresa(req, res);
});

router.delete('/delete-usuario', (req, res) => {
    UsuarioController.DeleteUsuario(req, res);
});

module.exports = router;
