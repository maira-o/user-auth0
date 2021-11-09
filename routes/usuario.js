const router            = require('express').Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/:id', /* tokenController.validation, */ usuarioController.buscaUsuario);
router.get('/buscaReduzidaUsuario/:id', /* tokenController.validation, */ usuarioController.buscaReduzidaUsuario);

module.exports = router;