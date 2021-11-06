const Joi               = require('joi');
const emailValidator    = require('email-validator');
const bcrypt            = require('bcryptjs');
const Usuario           = require('../models/Usuario');

exports.buscaUsuarioPorPapel = async (req) => {
    try {
        /* if(req.usuarioToFind.id != req.userLoggedId){
            // 403 Forbidden
            return { status: 403 }
        } */
        const usuario = await Usuario.findOne({ _id: req.usuarioToFind.id, papel: req.usuarioToFind.papel}).exec();
        if(!usuario){
            // 204 No Content
            return { status: 204 }
        }
        // 200 OK
        return { status: 200, usuario: usuario }
    } catch (err){
        console.log("buscaUsuario > err >>>")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500 }
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