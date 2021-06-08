const Domicilio = require("../models/domicilio");

const getDomicilio = async(req, res) => {

    const { id } = req.params;

    const domicilio = await Domicilio.findById(id).lean();

    if (domicilio) {
        res.render('domicilio_edicion', { obj: domicilio });
    } else {
        res.status(404).json({
            msg: `No existe un domicilio con el id ${id}`
        });
    }
}

const getDomicilioPost = async(req, res) => {

    const { id } = req.params;
    const { _id, __v, ...body } = req.body;

    const domicilio = await Domicilio.findById(id);

    if (domicilio) {

        const existeDomicilio = await Domicilio.findOne({ calle: body.calle, numero: body.numero });

        if (existeDomicilio) {
            const error = {
                msg: `Error domicilio ${calle} ${numero} ya existe`
            }
            return res.status(400).render('errores', { obj: [error] });
        }

        await domicilio.updateOne(body);
        res.redirect('/api/usuarios');
    } else {
        res.status(404).json({
            msg: `No existe un domicilio con el id ${id}`
        });
    }
}

module.exports = {
    getDomicilio,
    getDomicilioPost
}