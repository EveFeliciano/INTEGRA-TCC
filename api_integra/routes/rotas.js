const express = require('express');
const router = express.Router();

const UsuarioController = require('../components/Usuarios/UsuarioController');
const AlunoController = require('../components/Usuarios/AlunoController');
const EmpresaController = require('../components/Usuarios/EmpresaController');
const coordenadorController = require('../components/Usuarios/CoordenadorController');

router.get('/api', (req, res) => {
    res.json({mensagem: "Api funcionando!"});
});

router.get('/estudantes', (req, res) => {
    AlunoController.GetAllEstudantes(res);
});

router.get('/coordenadores', (req, res) => {
    coordenadorController.GetAllCoordenadores(res);
});

router.get('/empresas', (req, res) => {
    EmpresaController.GetAllEmpresas(res);
});

router.post('/inserir-estudante', (req, res) => {
    AlunoController.InserirEstudante(req, res);
});

router.post('/inserir-coordenador', (req, res) => {
    coordenadorController.InserirCoordenador(req, res);
});

router.post('/inserir-empresa', (req, res) => {
    EmpresaController.InserirEmpresa(req, res);
});

router.delete('/delete-usuario', (req, res) => {
    UsuarioController.DeleteUsuario(req, res);
});

module.exports = router;
