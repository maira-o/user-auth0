const Joi               = require('joi');
const emailValidator    = require('email-validator');
const bcrypt            = require('bcryptjs');
const Usuario           = require('../models/Usuario');

exports.buscaUsuarioPorPapel = async (req, res) => {
    const { usuarioToFind, userLoggedId } = req.body
    try {
        /* if(usuarioToFind.id != userLoggedId){
            // 403 Forbidden
            return res.status(403).send({ status: 403, message: 'Acesso negado' });
        } */
        const usuario = await Usuario.findOne({ _id: usuarioToFind.id, papel: usuarioToFind.papel}).exec();
        if(!usuario){
            // 204 No Content
            return res.status(204).send({ status: 204, message: 'Usuário não encontrado' });
        }
        // 200 OK
        return res.status(200).send({ status: 200, message: 'Sucesso', usuario: usuario });
    } catch (err){
        console.log("buscaUsuarioPorPapel > err >>>")
        console.log(err)
        // 500 Internal Server Error
        res.status(500).send({ status: 500, message: "Erro ao buscar Usuário" });

    }
}

exports.novoUsuario = async (req) => {
    try {
        const {error} = registerValidation(req);
        if(error){
            console.log("novoUsuario > error >>>")
            console.log(error.details[0].message)
            // 400 Bad Request
            return { status: 400, message: 'O objeto enviado é inválido' }
        }

        const emailLowerCase = req.email.toLowerCase();
        if(!isEmail(emailLowerCase)){
            // 400 Bad Request
            return { status: 400, message: 'Endereço de e-mail inválido' }
        }

        if(req.senha !== req.confirmaSenha){
            // 400 Bad Request
            return { status: 400, message: 'Senhas não conferem' }
        }

        const emailExiste = await Usuario.findOne({ email: emailLowerCase });
        if(emailExiste) {
            // 400 Bad Request
            return { status: 400, message: 'E-mail já cadastrado' }
        }

        const salt          = await bcrypt.genSalt(10);
        const hashSenha     = await bcrypt.hash(req.senha, salt);
        const novoUsuario   = new Usuario({
            nome:   req.nome,
            email:  emailLowerCase,
            senha:  hashSenha,
            papel:  req.papel
        });

        const usuario  = await novoUsuario.save();
        // 200 OK
        return { status: 200, usuario: usuario }
    } catch (err){
        console.log("novoUsuario > err >>> ")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500 }
    }
}

exports.apagaUsuario = async (usuario) => {
    try {
        await usuario.deleteOne()
        // 200 OK
        return { status: 200, message: 'Usuário apagado' }
    } catch (err){
        console.log("apagaUsuario > err >>> ")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500 }
    }
}

const registerValidation = (data) => {
    const schema = Joi.object({
        nome:           Joi.string().required(),
        email:          Joi.string().required(),
        senha:          Joi.string().required(),
        confirmaSenha:  Joi.string().required(),
        papel:          Joi.number().integer().min(1).max(3).required()
    });
    return schema.validate(data);
}

const isEmail = (email) => {
    return emailValidator.validate(email)
}