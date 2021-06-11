const { Router } = require("express");
const { check } = require("express-validator");
const { login, loginGet, renovarToken } = require("../controllers/auth");
const { emailNoExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/login", loginGet);

router.post("/login", [
    check("email", "El correo es obligatorio").isEmail(),
    check("email", "El email no existe").custom(emailNoExiste),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
], login);

module.exports = router;