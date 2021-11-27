const axios = require('axios');

exports.novoEducador = async (data) => {
    try {
        return await axios.post(`${process.env.APP_EDUCADOR_URL}/educador/`, data);
    } catch (err) {
        console.log("serviceEducador > novoEducador > err >>>")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500, message: "Erro no novoEducador" }
    }
}

exports.buscaReduzidaEducador = async (id) => {
    try {
        return await axios.get(`${process.env.APP_EDUCADOR_URL}/educador/buscaReduzidaEducador/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.log("serviceEducador > buscaReduzidaEducador > err >>>")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500, message: "Erro ao buscaReduzidaEducador" }
    }
}

exports.apagaEducador = async (id) => {
    try {
        return await axios.delete(`${process.env.APP_EDUCADOR_URL}/educador/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.log("serviceEducador > apagaEducador > err >>>")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500, message: "Erro ao apagar Educador" }
    }
}