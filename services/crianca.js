const axios = require('axios');

exports.novaCrianca = async (req, data) => {
    try {
        return await axios.post(`${process.env.APP_CRIANCA_URL}/crianca/`, data, {
            headers: { token: req.headers.token, userId: req.headers.userid }
        });
    } catch (err) {
        console.log("serviceCrianca > novaCrianca > err >>>")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500, message: "Erro no novaCrianca" }
    }
}

exports.buscaReduzidaCrianca = async (req, id) => {
    try {
        return await axios.get(`${process.env.APP_CRIANCA_URL}/crianca/buscaReduzidaCrianca/${id}`, {
            headers: { token: req.headers.token, userId: req.headers.userid }
        });
    } catch (err) {
        console.log("serviceCrianca > buscaReduzidaCrianca > err >>>")
        console.log(err)
        // 500 Internal Server Error
        return { status: 500, message: "Erro ao buscaReduzidaCrianca" }
    }
}