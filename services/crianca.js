const axios = require('axios');

exports.novaCrianca = async (data) => {
    try {
        return await axios.post(`${process.env.APP_CRIANCA_URL}/crianca/`, data);
    } catch (err) {
        return (err.response)
    }
}

/* const authAxios = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
}); */

exports.buscaReduzidaCrianca = async (req, id) => {
    try {
        return await axios.get(`${process.env.APP_CRIANCA_URL}/crianca/buscaReduzidaCrianca/${id}`, {
            headers: { token: req.headers.token /* localStorage.getItem('token') */ }
        });
    } catch (err) {
        console.log("serviceCrianca > buscaReduzidaCrianca > err >>>")
        console.log(err)
        // 500 Internal Server Error
        return res.status(500).send({ status: 500, message: "Erro ao buscar buscaReduzidaCrianca" });
    }
}