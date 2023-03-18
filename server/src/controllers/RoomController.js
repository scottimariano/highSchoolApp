const Router = require('express');
const { Sequelize } = require('sequelize');
const { Room, Student } = require('../db');
const jwt = require('jsonwebtoken');

const roomController = Router();

function authenticateToken(req, res){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
 
    if(token == null){
      return res.sendStatus(401);
    }
 
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if(err){
            return res.sendStatus(403);
        }

        console.log(user + " VALIDADO!!")

    })
}

roomController.get('/', async (req, res) => {
    
    console.log(authenticateToken(req, res));
    
    
    const nameFilter = req.query.name ? req.query.name : ''

    try {
        const roomList = await Room.findAll({
            include: [{
                model: Student,
                attributes: []
            }]
            ,
            attributes: {
                include: [
                    [
                    Sequelize.fn('COUNT', Sequelize.col('Students.id')),
                    'attendees'
                    ]
                ]
            },
            where: {
                name: {
                    [Sequelize.Op.like]: `%${nameFilter}%`
                }
            },
            group: ['Room.id'],
            order: [['id', 'ASC']]
        });
        res.send(roomList)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving rooms and students');
    }
})





module.exports = roomController;