const router                = require('express').Router();
const educadorController    = require('../controllers/educadorController');

router.post('/', educadorController.novoEducador);

module.exports = router;