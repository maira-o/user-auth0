const mongoose          = require('mongoose');
const mongooseHidden    = require('mongoose-hidden')({
                                                        // OVERRIDING default TO RETURN _id
                                                        defaultHidden: { senha: true }
                                                    });

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    senha: {
        type: String,
        required: true,
        //hide: true
    },
    papel: {
        type: Number,
        min: 1, 
        max: 3,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        //hide: true
    },
});

usuarioSchema.plugin(mongooseHidden)

//usuarioSchema.index({'$**': 'text'});

module.exports = mongoose.model('Usuario', usuarioSchema)