const Router = require('express');
const { RoomService } = require('../services/RoomService');

const roomController = Router();

roomController.get('/:id', async (req, res) => {

    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

    RoomService.findByPk(id)
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

    RoomService.findAll(nameFilter)
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

    RoomService.create(name, teacher)
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

    RoomService.update(id, name, teacher)
    .then((updatedRecord)=> {
        return res.status(200).json(updatedRecord);
    })
    .catch((err)=>{
        console.error(err);
        if(err.message == "Room Not found"){
            return res.status(404).send(`We couldn't find the room with ID: ${id}`);
        }
        return res.status(500).json({ message: 'Error editing room' });
    })
});

roomController.delete('/:id', async (req, res) => {

	const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

	RoomService.deleteRoom(id)
    .then(() => {
        res.send(`Room ID: ${id} was successfully deleted`);
        })
    .catch((err) => {
        console.error(err);
        if(err.message == "Room Not found"){
            return res.status(404).send(`We couldn't find the room with ID: ${id}`);
        }
        return res.status(500).json({ message: 'Error deleting room' });
    })
});

module.exports = roomController;