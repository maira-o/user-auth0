const axios = require('axios');

exports.novoEducador = async (data) => {
    try {
        return await axios.post(`${process.env.APP_EDUCADOR_URL}/`, data);
    } catch (err) {
        return (err.response)
    }
}