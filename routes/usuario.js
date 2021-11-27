const router            = require('express').Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/:id',                      usuarioController.buscaUsuario);
router.get('/buscaReduzidaUsuario/:id', usuarioController.buscaReduzidaUsuario);
router.post('/',                        usuarioController.novoUsuario);
router.delete('/:id',                   usuarioController.apagaUsuario);

module.exports = router;