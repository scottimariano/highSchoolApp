const server = require('../app.js');
const Router = require('express');
const { Student, Room} = require('../db');
const { Sequelize } = require('sequelize');

const studentController = Router();

studentController.get('/:id', async (req, res) => {

    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }

    Student.findOne({
        where: { id },
        attributes: ['id', 'name', 'lastName', 'age', 'gender', 'profileImageUrl'],
        include: [
            {
                model: Student,
                as: 'siblings',
                through: 'Sibling',
                attributes: ['id', 'name', 'lastName'],
                through: {
                    attributes: []
                }
            },
            {
                model: Room,
                attributes: ['id', 'name']
            }
        ]
    })
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

    Student.findAll({
        include: [
            {
                model: Student,
                as: 'siblings',
                through: 'Sibling',
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }
        ],
        where: {
            [Sequelize.Op.or]: [
                {
                    name: {
                        [Sequelize.Op.like]: `%${nameFilter}%`
                    }
                },
                {
                    lastName: {
                        [Sequelize.Op.like]: `%${nameFilter}%`
                    }
                }
            ]
        },
        order: [['id', 'ASC']]
    })
    .then((studentList)=>{
        return res.status(200).json(studentList);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Error retrieving students');
    });
});

studentController.post('/', async (req, res) => {

    let {name, lastName, age, gender,roomId, profileImageUrl, siblingsIds} = req.body
    
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

    Student.create({
        name,
        lastName,
        age,
        gender,
        RoomId: roomId,
        profileImageUrl
    })
    .then(newStudent => {
        if (siblingsIds.length > 0) {
            siblingsIds.forEach(id => {
                Student.findByPk(id)
                .then(student => {
                    newStudent.addSibling(student)
                    student.addSibling(newStudent)
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ message: 'Error associating sibling' });
                })
            });
        }
        return res.status(201).json(newStudent);
    })
    .catch(err => {
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

    Student.findByPk(id)
    .then((student) => {
        student.update(
            {
                name,
                lastName,
                age,
                gender,
                RoomId: roomId,
                profileImageUrl
            }
        )
        student.setSiblings([])
        .then(res=>{
            if (siblingsIds && siblingsIds.length > 0) {
                siblingsIds.forEach(id => {
                    Student.findByPk(id)
                    .then(studentsibling => {
                        student.addSibling(studentsibling)
                        studentsibling.addSibling(student)
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).json({ message: 'Error associating sibling' });
                    })
                });
            }
        })
        
    })
    .then(updatedStudent => {
        return res.status(200).json(updatedStudent);
    })
    .catch((err)=>{
        console.error(err);
        return res.status(500).json({ message: 'Error creating student' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(404).send(`We couldn't find the student with ID: ${id}`);
    });
    
})


studentController.delete('/:id', async (req, res) => {

	const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send('Invalid room ID');
    }
    
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