const server = require('../app.js');
const Router = require('express');
const { Student } = require('../db');

const studentController = Router();

studentController.get('/', async (req, res) => {
    Student.findAll()
    .then((studentList)=>{
        return res.status(200).json(studentList);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Error retrieving students');
    });
});

studentController.post('/', async (req, res) => {
    let {name, lastName, age, roomId} =req.body
    
    Student.create({
        name,
        lastName,
        age,
        RoomId: roomId
    })
    .then(newStudent => {
        return res.status(201).json(newStudent);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ message: 'Error creating student' });
    })  
});

studentController.put('/:id', async (req, res) => {

    const { id } = req.params;
    let {name, lastName, age, roomId} = req.body;

    Student.findByPk(id)
    .then((record) => {
        record.update(
            {
                name,
                lastName,
                age,
                RoomId: roomId
            }
        )
        .then((updatedRecord)=> {
            return res.status(200).json(updatedRecord);
        })
        .catch((err)=>{
            console.error(err);
            return res.status(500).json({ message: 'Error creating student' });
        })
    })
    .catch((err) => {
        console.error(err);
        return res.status(404).send(`We couldn't find the student with ID: ${id}`);
    });

});

studentController.delete('/:id', async (req, res) => {

	const { id } = req.params;

	Student.findByPk(id)
    .then((student) => {
        student.destroy()
        .then(() => {
            res.send(`Student ID: ${id} was successfully deleted`);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting student' });
        })
    })
    .catch((e) => {
        return res.status(404).send(`We couldn't find the student with ID: ${id}`);
    });
})

module.exports = studentController;