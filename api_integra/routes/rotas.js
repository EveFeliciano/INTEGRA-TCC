const express = require('express');
const router = express.Router();


const UsuarioController = require('../components/Usuarios/UsuarioController');
const AlunoController = require('../components/Usuarios/AlunoController');
const EmpresaController = require('../components/Usuarios/EmpresaController');
const CoordenadorController = require('../components/Usuarios/CoordenadorController');
const EnderecoController = require('../components/EnderecoController');

router.use(express.json());
router.use(express.urlencoded({ extended: true })); 

router.get('/api', (req, res) => {
    res.json({mensagem: "Api funcionando!"});
}); 

//ALUNOS
router.get('/estudantes', (req, res) => {
    AlunoController.GetAllEstudantes(res);
});

router.post('/inserir-estudante', (req, res) => {
    AlunoController.InserirEstudante(req, res);
});

router.put('/atualizar-estudante', (req, res) => {
    AlunoController.AtualizarEstudante(req, res);
});

//COORDENADORES
router.get('/coordenadores', (req, res) => {
    CoordenadorController.GetAllCoordenadores(res);
});

router.post('/inserir-coordenador', (req, res) => {
    CoordenadorController.InserirCoordenador(req, res);
});

router.put('/atualizar-coordenador', (req, res) => {
    CoordenadorController.AtualizarCoordenador(req, res);
});

//EMPRESAS
router.get('/empresas', (req, res) => {
    EmpresaController.GetAllEmpresas(res);
});

router.post('/inserir-empresa', (req, res) => {
    EmpresaController.InserirEmpresa(req, res);
});

router.put('/atualizar-empresa', (req, res) => {
    EmpresaController.AtualizarEmpresa(req, res);
});

//ENDEREÇO
router.post('/atualizar-endereco', (req, res) => {
    EnderecoController.AtualizarEndereco(req, res);
});

router.delete('/delete-usuario', (req, res) => {
    UsuarioController.DeleteUsuario(req, res);
});

module.exports = router;
