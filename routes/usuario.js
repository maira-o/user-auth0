const router            = require('express').Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/buscaUsuarioPorPapel', usuarioController.buscaUsuarioPorPapel);

module.exports = router;