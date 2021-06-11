const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario")

const validarJWT = async(req = request, res = response, next) => {

    const token = req.cookies['token'];

    if (!token) {
        const error = {
            msg: "No hay token en la peticion"
        }
        return res.status(401).render('errores', { obj: [error] });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leeer el usuario que corresponde al uid
        const usuario = await Usuario.findOne({ _id: uid })

        if (!usuario) {
            const error = {
                msg: "Token no valido - usuario no existe en DB"
            }
            return res.status(401).render('errores', { obj: [error] });
        }

        req.usuario = usuario;
        next();

    } catch (err) {
        console.log(err);
        const error = {
            msg: "Token no valido"
        }
        return res.status(401).render('errores', { obj: [error] });
    }
}

module.exports = {
    validarJWT
}