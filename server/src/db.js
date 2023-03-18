
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const RoomModel = require('./models/Room');
const StudentModel = require('./models/Student');


const sequelize = process.env.NODE_ENV === 'production' ?
    new Sequelize({
        database: DB_NAME,
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            keepAlive: true,
        },
        ssl: true,
    }) : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: 'localhost',
            dialect: 'postgres'
        });

const Room = RoomModel(sequelize);
const Student = StudentModel(sequelize);
Room.hasMany(Student, { foreignKey: 'RoomId'});
Student.belongsTo(Room);
Student.belongsToMany
    (
        Student, 
        {
            through: 'Sibling',
            as: 'siblings',
            foreignKey: 'studentId',
            otherKey: 'siblingId',
            timestamps: false
        }
    )

sequelize.sync();


module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};