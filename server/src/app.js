const express = require('express');
const roomController = require('./controllers/RoomController');
const studentController = require('./controllers/StudentController');
const { authController } = require('./controllers/AuthController');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const server = express();
server.name = 'API';

server.use(cors());
server.use(bodyParser.json({limit: '50mb'}))
server.use(cookieParser());
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
server.use('/login', authController)
server.use('/rooms', roomController)
server.use('/students', studentController)

module.exports = server;