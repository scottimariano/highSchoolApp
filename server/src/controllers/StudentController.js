const server = require('../app.js');
const Router = require('express');
const { Student, Room} = require('../db');
const { Sequelize } = require('sequelize');
const { StudentService } = require('../services/StudentService.js');

const studentController = Router();

studentController.get('/:id', async (req, res) => {

    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

    StudentService.findByPk(id)
    .then((student)=>{
        if(!student){
            return res.status(404).send('Student Not Found');
        }
        return res.status(200).json(student);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Error retrieving student');
    });
});

studentController.get('/', async (req, res) => {
    
    const nameFilter = req.query.name ? req.query.name : ''

    if (nameFilter && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(nameFilter)) {
        return res.status(400).send('Invalid name filter');
    }

    StudentService.findAll(nameFilter)
    .then((studentList)=>{
        return res.status(200).json(studentList);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Error retrieving students');
    });
});

studentController.post('/', async (req, res) => {

    let {name, lastName, age, gender, roomId, profileImageUrl, siblingsIds} = req.body
    
    if (!name || !lastName || !age || !gender) {
        return res.status(400).json({ message: 'Name, lastName, age, and gender are required fields' });
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(name) || !nameRegex.test(lastName)) {
        return res.status(400).json({ message: 'Name and Last Name must contain only letters' });
    }

    if (isNaN(age) || age < 2) {
        return res.status(400).json({ message: 'Age must be a number greater than 1' });
    }

    if (gender !== 'male' && gender !== 'female') {
        return res.status(400).json({ message: 'Gender must be male or female' });
    }

    if(!profileImageUrl){
        if (gender === 'male') {
            profileImageUrl = "https://res.cloudinary.com/dmwfysfrn/image/upload/v1679594349/ratherLab/profileImages/ppn3gxsnyzjvjj0q8fof.png";
        } else if (gender === 'female') {
            profileImageUrl = "https://res.cloudinary.com/dmwfysfrn/image/upload/v1679594304/ratherLab/profileImages/gmqyqh9te6st3yo4pbag.png";
        } else {
            profileImageUrl = ""
        }
    }

    const payload = {
        name,
        lastName,
        age,
        gender,
        roomId,
        profileImageUrl,
        siblingsIds
    }
    StudentService.create(payload)
    .then(newStudent=>{
        return res.status(201).json(newStudent)
    })
    .catch((err)=>{
        console.error(err);
        return res.status(500).json({ message: 'Error creating student' });
    })

});

studentController.put('/:id', async (req, res) => {

    const { id } = req.params;
    let {name, lastName, age, gender, roomId, profileImageUrl, siblingsIds} = req.body;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(name) || !nameRegex.test(lastName)) {
        return res.status(400).json({ message: 'Name and Last Name must contain only letters' });
    }

    if (age && (isNaN(age) || age < 2)) {
        return res.status(400).json({ message: 'Age must be a number greater than 1' });
    }

    if (gender && (gender !== 'male' && gender !== 'female')) {
        return res.status(400).json({ message: 'Gender must be male or female' });
    }

    const payload = {
        name,
        lastName,
        age,
        gender,
        roomId,
        profileImageUrl,
        siblingsIds
    }

    StudentService.update(id, payload)
    .then(updatedStudent => {
        return res.status(200).json(updatedStudent);
    })
    .catch((err)=>{
        if (err.message == "Student not found"){
            return res.status(404).json({ message: err.message })
        }
        return res.status(500).json({ message: err.message });
    })

    
})


studentController.delete('/:id', async (req, res) => {

	const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }
    
	StudentService.deleteStudent(id)
    .then((student) => {
        return res.send(`Student ID: ${id} was successfully deleted`)
    })
    .catch((e) => {
        console.log(e.message)
        if(e.message == "Student not found"){
            return res.status(404).send(`We couldn't find the student with ID: ${id}`);
        }
        return res.status(500).json({ message: err.message });
    });
})

module.exports = studentController;