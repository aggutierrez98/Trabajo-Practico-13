const { Router } = require("express");
const { getDomicilio, getDomicilioPost } = require('../controllers/domicilios');

const router = Router();

router.get("/:id", [], getDomicilio)

router.post("/:id", [

], getDomicilioPost)

module.exports = router;