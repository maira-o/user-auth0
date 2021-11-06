const Usuario           = require('../models/Usuario');
const usuarioController = require('../controllers/usuarioController');

exports.buscaEducador = async (req, res) => {
    req.user = { _id: '1234' } // APAGAR
    //req.user = { _id: '6186f0f5701206fa05ff3d68' } // APAGAR

    try {
        const reqEducador = {
            usuarioToFind: {
                id:     req.params.id,
                papel:  1
            },
            userLoggedId: req.user._id
        }
        /* console.log("buscaEducador > reqEducador >>>")
        console.log(reqEducador) */

        const result = await usuarioController.buscaUsuarioPorPapel(reqEducador)
        switch (result.status) {
            case 403:
                // 403 Forbidden
                res.status(403).send({ status: 403, message: 'Acesso negado' });
                break;
            case 204:
                // 204 No Content
                res.status(204).send({ status: 204, message: 'Educador não encontrado' });
                break;
            case 200:
                // 200 OK
                res.status(200).send({ status: 200, message: "Sucesso", educador: result.usuario });
                break;
            default:
                console.log("buscaEducador > default > result >>>")
                console.log(result)
                // 500 Internal Server Error
                res.status(500).send({ status: 500, message: "Erro ao buscar Educador" });
        }
    } catch (err){
        console.log("buscaEducador > err >>>")
        console.log(err)
        // 500 Internal Server Error
        res.status(500).send({ status: 500, message: "Erro ao buscar Educador" });
    }
}

exports.novoEducador = async (req, res) => {
    const { nome, email, senha, confirmaSenha } = req.body
    const request = {
        nome:           nome,
        email:          email,
        senha:          senha,
        confirmaSenha:  confirmaSenha,
        papel:          1
    }
    try {
        const result = await usuarioController.novoUsuario(request)
        switch (result.status) {
            case 400: // 400 Bad Request
            case 406: // 406 Not Acceptable
                res.status(result.status).send({ status: result.status, message: result.message });
                break;
            case 200: // 200 OK
                res.status(result.status).send({ status: result.status, message: result.message, educador: result.usuario });
                break;
            default:
                console.log("novoEducador > default > result >>>")
                console.log(result)
                // 500 Internal Server Error
                res.status(500).send({ status: 500, message: "Erro ao cadastrar Educador" });
        }
    } catch (err){
        console.log("novoEducador > err >>>")
        console.log(err)
        // 500 Internal Server Error
        res.status(500).send({ status: 500, message: "Erro ao cadastrar Educador" });
    }
}