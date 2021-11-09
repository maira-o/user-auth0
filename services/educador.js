const axios = require('axios');

exports.novoEducador = async (data) => {
    try {
        return await axios.post(`${process.env.APP_EDUCADOR_URL}/`, data);
    } catch (err) {
        return (err.response)
    }
}

exports.buscaEducador = async (id) => {
    try {
        return await axios.get(`${process.env.APP_EDUCADOR_URL}/${id}`, {
            headers: { /* token: localStorage.getItem('token') */ }
        });
    } catch (err) {
        return (err.response)
    }
} 