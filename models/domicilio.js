const { Schema, model } = require("mongoose");


const DomicilioSchema = Schema({
    calle: {
        type: String,
        required: [true, "La calle es obligatoria"],
    },
    numero: {
        type: Number,
        required: [true, "El numero de domicilio es obligatorio"],
    }
});

module.exports = model("Domicilio", DomicilioSchema);