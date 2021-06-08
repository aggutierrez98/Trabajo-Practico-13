const dotenv = require("dotenv");
const Server = require("./models/server");

//Configurar dotenv
dotenv.config();

const server = new Server();

server.listen();