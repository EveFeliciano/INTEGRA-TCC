const express = require('express');
const router = express.Router();


const UsuarioController = require('../components/Usuarios/UsuarioController');
const AlunoController = require('../components/Usuarios/AlunoController');
const EmpresaController = require('../components/Usuarios/EmpresaController');
const CoordenadorController = require('../components/Usuarios/CoordenadorController');
const InstituicaoController = require('../components/Usuarios/InstituicaoController');
const PalestranteController = require('../components/Usuarios/PalestranteController');
const EnderecoController = require('../components/EnderecoController');
const LoginController = require('../components/LoginController');

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

//INSTITUIÇÕES
router.get('/instituicoes', (req, res) => {
    InstituicaoController.GetAllInstituicoes(res);
});

router.post('/inserir-instituicao', (req, res) => {
    InstituicaoController.InserirInstituicao(req, res);
});

router.put('/atualizar-instituicao', (req, res) => {
    InstituicaoController.AtualizarInstituicao(req, res);
});

//PALESTRANTE
router.get('/palestrantes', (req, res) => {
    PalestranteController.GetAllPalestrantes(res);
});

router.post('/inserir-palestrante', (req, res) => {
    PalestranteController.InserirPalestrante(req, res);
});

router.put('/atualizar-palestrante', (req, res) => {
    PalestranteController.AtualizarPalestrante(req, res);
});

//ENDEREÇO
router.get('/enderecos', (req, res) => {
    EnderecoController.GetAllEnderecos(res);
});

router.post('/atualizar-endereco', (req, res) => {
    EnderecoController.AtualizarEndereco(req, res);
});

router.delete('/delete-endereco', (req, res) => {
    EnderecoController.DeleteEndereco(req, res);
});

//USUARIOS

router.get('/login', (req, res) => {
    UsuarioController.UsuarioLogado(req, res);
});

router.get('/logout', (req, res) => {
    UsuarioController.Logout(req, res);
});

router.delete('/delete-usuario', (req, res) => {
    UsuarioController.DeleteUsuario(req, res);
});

//LOGIN 
router.post('/login', (req, res) => {
    LoginController.Login(req, res);
});

module.exports = router;
