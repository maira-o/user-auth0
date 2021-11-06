const router                = require('express').Router();
const educadorController    = require('../controllers/educadorController');
//const tokenController       = require('../controllers/tokenController');

router.get('/:id', /* tokenController.validation, */ educadorController.buscaEducador);
router.post('/', /* tokenController.validation, */ educadorController.novoEducador);

module.exports = router;