require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const RoomModel = require('./models/Room');
const StudentModel = require('./models/Student');
const UserModel = require('./models/User');
const bcrypt = require('bcryptjs');

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
            dialect: 'postgres',
            logging: false,
        });

const Room = RoomModel(sequelize);
const Student = StudentModel(sequelize);
const User = UserModel(sequelize)
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

(async () => {
    try {
      const usersCount = await User.count();
      if (usersCount > 0) {
        console.log('Ya hay usuarios en la base de datos. No se creará el primer usuario.');
        return;
      }

      const mail = 'scottimariano@gmail.com';
      const plainPassword = '12345678';
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(plainPassword, salt);
      await User.create({ mail, password: hashedPassword });
      console.log('Primer usuario creado correctamente.');
    } catch (error) {
      console.error('Error al crear el primer usuario:', error);
    }
  })();




module.exports = {
    ...sequelize.models,
    conn: sequelize
};