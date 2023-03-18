const server = require('../app.js');
const Router = require('express');
const { Room, Student } = require('../db');

const studentController = Router();

studentController.get('/', async (req, res) => {
    const studentList = await Student.findAll();
	res.send(studentList)
});

studentController.post('/', async (req, res) => {
    try {
        let {name, lastName, age, roomId} =req.body
        const newStudent = await Student.create({
            name,
            lastName,
            age,
            RoomId: roomId
        });
        return res.status(201).json(newStudent);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating student' });
      
    }
});

module.exports = studentController;