const Router = require('express');
const { Sequelize } = require('sequelize');
const { Room, Student } = require('../db');
const jwt = require('jsonwebtoken');

const roomController = Router();

roomController.get('/', async (req, res) => {

    const nameFilter = req.query.name ? req.query.name : ''

    Room.findAll({
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
    })
    .then((roomList)=>{
        return res.send(roomList)
    })
    .catch(e => {
        console.log(e);
        res.status(500).send('Error retrieving rooms');
    });
});

roomController.post('/', async (req, res) => {

    let {name, teacher} =req.body;

    Room.create({
        name,
        teacher
    })
    .then((newRoom)=>{
        return res.status(201).json(newRoom);
    })
    .catch((e) => {
        console.error(err);
        return res.status(500).json({ message: 'Error creating room' });
    });
});

roomController.put('/:id', async (req, res) => {

    const { id } = req.params;
    let {name, teacher} = req.body;

    Room.findByPk(id)
        .then((record) => {
            record.update(
                {
                    name,
                    teacher
                }
            )
            .then((updatedRecord)=> {
                return res.status(200).json(updatedRecord);
            })
            .catch((e)=>{
                return res.status(500).json({ message: 'Error creating room' });
            })
        })
        .catch((e) => {
            return res.status(404).send(`We couldn't find the room with ID: ${id}`);
        });

});

roomController.delete('/:id', async (req, res) => {

	const { id } = req.params;

	Room.findByPk(id)
		.then((response) => {
			if (response) {
				response.destroy().then((r) => {
					res.send(`Room ID: ${id} was successfully deleted`);
				});
			} else {
				res.status(404).send(`We couldn't find the room with ID: ${id}`);
			}
		})
		.catch((e) => console.log(e.message));
});

module.exports = roomController;