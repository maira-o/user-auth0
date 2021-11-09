const usuarioController = require('./usuarioController');
const educadorService   = require('../services/educador');

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
                const dataResult = await educadorService.novoEducador(result.usuario)
                switch (dataResult.status) {
                    case 400: // 400 Bad Request
                    case 406: // 406 Not Acceptable
                        res.status(dataResult.data.status).send({ status: dataResult.data.status, message: dataResult.data.message });
                        break;
                    case 200: // 200 OK
                        res.status(dataResult.data.status).send({ status: dataResult.data.status, message: dataResult.data.message, educador: dataResult.data.educador });
                        break;
                    default:
                        await usuarioController.apagaUsuario(result.usuario)
                        console.log("novoEducador > 200 > default > dataResult >>>")
                        console.log(dataResult)
                        // 500 Internal Server Error
                        res.status(500).send({ status: 500, message: "Erro ao cadastrar Educador" });
                }    
                break;
            default:
                console.log("novoEducador > 200 > default > result >>>")
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