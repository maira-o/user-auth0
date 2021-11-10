const axios = require('axios');

exports.novaCrianca = async (data) => {
    try {
        return await axios.post(`${process.env.APP_CRIANCA_URL}/`, data);
    } catch (err) {
        return (err.response)
    }
}

exports.buscaReduzidaCrianca = async (id) => {
    try {
        return await axios.get(`${process.env.APP_CRIANCA_URL}/buscaReduzidaCrianca/${id}`, {
            headers: { /* token: localStorage.getItem('token') */ }
        });
    } catch (err) {
        return (err.response)
    }
}