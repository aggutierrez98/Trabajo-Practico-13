const express = require("express");
const usuariosRoutes = require("../routes/usuarios");
const domiciliosRoutes = require("../routes/domicilios");
const authRoutes = require('../routes/auth');
const cors = require("cors");
const { dbConnection } = require('../database/connection');
const handlebars = require('express-handlebars').create({ 'defaultLayout': 'main' });
var body_parser = require("body-parser");
const cookieParser = require('cookie-parser');


class Server {



    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.apiPaths = {
            auth: '/api/auth',
            usuarios: "/api/usuarios",
            domicilios: "/api/domicilios"
        }

        //Metodos iniciales
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        //Configuracion de body parser necesaria para pasar informacion por el body por el metodo POST
        this.app.use(body_parser.urlencoded({ extended: false }));
        this.app.use(body_parser.json());
        this.app.use(cookieParser());

        this.app.engine('handlebars', handlebars.engine);
        this.app.set('view engine', 'handlebars');
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.render('index');
        });
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.usuarios, usuariosRoutes);
        this.app.use(this.apiPaths.domicilios, domiciliosRoutes);
        this.app.get('*', (req, res) => {
            res.status(404).render('default');
        });
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;