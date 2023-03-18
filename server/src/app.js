const express = require('express');
const roomController = require('./controllers/RoomController');
const studentController = require('./controllers/StudentController');
const { authController } = require('./controllers/AuthController');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
server.name = 'API';

server.use(cors());
server.use(bodyParser.json({limit: '50mb'}))
server.use('/login', authController)
server.use('/rooms', roomController)
server.use('/students', studentController)

module.exports = server;