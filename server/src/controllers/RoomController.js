const Router = require('express');
const { Sequelize } = require('sequelize');
const { Room, Student } = require('../db');

const roomController = Router();

roomController.get('/:id', async (req, res) => {

    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

    Room.findOne({
        where: { id },
        include: [{
            model: Student,
            where: { 'RoomId': id },
            attributes: ['id', 'name', 'lastName', 'profileImageUrl'],
            required: false
        }],
        attributes: {
            include: [
                [
                    Sequelize.literal('(SELECT COUNT(*) FROM "Students" WHERE "Students"."RoomId" = "Room"."id")'),
                    'attendees'
                ]
            ]
        }
    })
    .then((room)=>{
        if(!room){
            return res.status(404).send('Room Not Found');
        }
        return res.status(200).json(room)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving room');
    });
});

roomController.get('/', async (req, res) => {

    const nameFilter = req.query.name ? req.query.name : ''

    if (nameFilter && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(nameFilter)) {
        return res.status(400).send('Invalid name filter');
    }

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
            [Sequelize.Op.or]: [
                {
                    name: {
                        [Sequelize.Op.like]: `%${nameFilter}%`
                    }
                },
                {
                    teacher: {
                        [Sequelize.Op.like]: `%${nameFilter}%`
                    }
                }
            ]
        },
        group: ['Room.id'],
        order: [['id', 'ASC']]
    })
    .then((roomList)=>{
        return res.send(roomList)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving rooms');
    });
});

roomController.post('/', async (req, res) => {

    let {name, teacher} =req.body;

    if (!name || !teacher) {
        return res.status(400).send('Name and Teacher field are required');
    }
    
    if (name && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
        return res.status(400).send('Invalid name');
    }

    if (teacher && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(teacher)) {
        return res.status(400).send('Invalid teacher');
    }

    Room.create({
        name,
        teacher
    })
    .then((newRoom)=>{
        return res.status(201).json(newRoom);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: 'Error creating room' });
    });
});

roomController.put('/:id', async (req, res) => {

    const { id } = req.params;
    let {name, teacher} = req.body;
    
    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

    if (!name && !teacher) {
        return res.status(400).send('At least one field is required (Name or Teacher)');
    }
    
    if (name && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
        return res.status(400).send('Invalid name');
    }

    if (teacher && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(teacher)) {
        return res.status(400).send('Invalid teacher');
    }


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
        .catch((err)=>{
            console.error(err);
            return res.status(500).json({ message: 'Error editing room' });
        })
    })
    .catch((err) => {
        console.error(err);
        return res.status(404).send(`We couldn't find the room with ID: ${id}`);
    });

});

roomController.delete('/:id', async (req, res) => {

	const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

	Room.findByPk(id)
    .then((room) => {
        room.destroy()
        .then(() => {
            res.send(`Room ID: ${id} was successfully deleted`);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting room' });
        })
    })
    .catch((e) => {
        return res.status(404).send(`We couldn't find the room with ID: ${id}`);
    });
});

module.exports = roomController;