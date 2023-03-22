const server = require('../app.js');
const Router = require('express');
const { Student, Room} = require('../db');

const studentController = Router();

studentController.get('/:id', async (req, res) => {

    const { id } = req.params;

    Student.findOne({
        where: { id },
        attributes: ['id', 'name', 'lastName', 'age', 'gender', 'profileImageUrl'],
        include: [
            {
                model: Student,
                as: 'siblings',
                through: 'Sibling',
                attributes: ['id', 'name'],
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
    .then((studentList)=>{
        return res.status(200).json(studentList);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Error retrieving student');
    });
});

studentController.get('/', async (req, res) => {
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
    let {name, lastName, age, gender,roomId, profileImageUrl, siblingsIds} =req.body
    
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
        .then(updatedStudent => {
            if (siblingsIds && siblingsIds.length > 0) {
                siblingsIds.forEach(id => {
                    Student.findByPk(id)
                    .then(student => {
                        updatedStudent.addSibling(student)
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).json({ message: 'Error associating sibling' });
                    })
                });
            } 
            return res.status(200).json(updatedStudent);
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