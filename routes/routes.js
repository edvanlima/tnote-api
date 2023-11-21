var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var FuncionarioController = require("../controllers/FuncionarioController");
var HorasProjetoController = require("../controllers/HorasProjetoController");
var ProjetosController = require("../controllers/ProjetosController");
var AdminAuth = require("../middleware/AdminAuth");
var HorarioController = require('../controllers/HorarioController')
var DashboardController = require('../controllers/DashboardController')

const ClienteController = require("../controllers/ClienteController");



//horario
router.get('/horario', HorarioController.index);



//de usuarios
router.post('/user', UserController.create);
router.get('/user', AdminAuth, UserController.index);
router.get('/user/:id', UserController.findUser);
router.put('/user', UserController.edit);
router.delete('/user/:id', UserController.delete);


router.post('/recoverpassword', UserController.recoveryPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);

//cliente
router.get('/cliente', ClienteController.findClient);
router.get('/cliente/:id_cliente', ClienteController.findClienteId);
router.post('/cliente', ClienteController.create);
router.put('/cliente/:id_cliente', ClienteController.update);


router.get('/procedure', UserController.testeProcedure);
//horario

router.get('/procedure', UserController.testeProcedure);



//funcionarios
router.get('/funcionario', FuncionarioController.findAll);
router.post('/funcionario', FuncionarioController.new);
router.get('/funcionario/:id_funcionario', FuncionarioController.findId);
router.put('/funcionario/:id_funcionario', FuncionarioController.update);
router.get('/cargo', FuncionarioController.CargoFunc);
router.get('/cidade', FuncionarioController.CidadeFunc);
router.get('/funcionarioativo', FuncionarioController.findAllActive);
//funcionario extrat



//dashboard
router.get('/extratofuncionario/:id_funcionario', DashboardController.extratoFunc);
router.get('/lancamentobusca', DashboardController.buscaLancamento);




//projetos
router.post('/projetos', AdminAuth, ProjetosController.create);
router.get('/projetos',AdminAuth, ProjetosController.findAllActive);
router.get('/projetosgerente', AdminAuth, ProjetosController.listGerenteTec);
router.get('/projetos/:id_projeto', AdminAuth, ProjetosController.findProjetoId);
router.put('/projetos/:id_projeto', ProjetosController.update);

//horas projeto
router.get('/horasprojetoindex/:id_funcionario', AdminAuth,  HorasProjetoController.indexHoraProjet);

router.get('/horasprojeto/:id_lancamento',  HorasProjetoController.find_id);

router.post('/horasprojeto',  HorasProjetoController.insereHorasProjeto);
router.post('/horasprojetodup/:id_horas_projeto',  HorasProjetoController.duplicar);
router.put('/horasprojeto/:id_lancamento', HorasProjetoController.updateLancamento);



module.exports = router;


