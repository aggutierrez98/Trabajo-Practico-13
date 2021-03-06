const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            const error = {
                msg: `Usuario o contraseña no son correctas`
            }
            return res.status(400).render('errores', { obj: [error] });
        }

        //Generar el JWT 
        const token = await generarJWT(usuario._id);

        res.cookie('token', token);

        res.redirect('/api/usuarios');

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

const logout = async(req, res = response) => {

    res.clearCookie('token');
    res.redirect('/');
}

const loginGet = (req, res = response) => {
    res.render('login', { obj: {} });
}

module.exports = {
    login,
    loginGet,
    logout
}