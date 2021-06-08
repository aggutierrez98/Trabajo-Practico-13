const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "El mail es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    domicilio_id: {
        type: Schema.Types.ObjectId,
        ref: 'Domicilio',
        required: true
    },
});

module.exports = model("Usuario", UsuarioSchema);