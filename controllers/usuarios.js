const Usuario = require("../models/usuario");
const Domicilio = require("../models/domicilio");
const bcryptjs = require("bcryptjs");


const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find().lean();

    res.render('usuarios_listado', { usuarios });
}


const getUsuario = async(req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    res.json(usuario);
}

const getUsuarioPost = (req, res) => {

    res.render('usuarios_creacion', { obj: {} });
}


const postUsuario = async(req, res) => {

    let { _id, __v, calle: calle, numero, ...body } = req.body;

    try {
        const existeDomicilio = await Domicilio.findOne({ calle, numero });

        if (existeDomicilio) {
            const error = {
                msg: `Error domicilio ${calle} ${numero} ya existe`
            }
            return res.status(400).render('errores', { obj: [error] });
        }

        const domicilio = new Domicilio({ calle, numero });
        await domicilio.save();

        const domicilio_id = domicilio._id;
        body.domicilio_id = domicilio_id;

        const usuario = new Usuario(body);

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();

        usuario.password = bcryptjs.hashSync(usuario.password, salt);

        await usuario.save();

        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}


const putUsuarioGet = async(req, res) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id).lean();

        res.render('usuarios_edicion', { obj: usuario });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

const putUsuario = async(req, res) => {

    const { id } = req.params;
    const { id: uid, email, createdAt, updatedAt, password, ...body } = req.body;

    try {
        const usuario = await Usuario.findById(id);

        await usuario.updateOne(body);

        res.redirect('/api/usuarios');

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

const deleteUsuario = async(req, res) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findByIdAndDelete(id);
        await Domicilio.findByIdAndDelete(usuario.domicilio_id);


        res.redirect('/api/usuarios');

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}

module.exports = {
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
    getUsuarioPost,
    putUsuarioGet
}