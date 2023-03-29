const { Student, Room} = require('../db');
const { Sequelize } = require('sequelize');

function findByPk(id){
    return (
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
    )
}

function findAll(nameFilter){
    return (
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
    )
}

function create(payload){

    return (
        Student.create({
            name: payload.name,
            lastName: payload.lastName,
            age: payload.age,
            gender: payload.gender,
            RoomId: payload.roomId,
            profileImageUrl: payload.profileImageUrl
        })
        .then(newStudent => {
            if (payload.siblingsIds.length > 0) {
                const siblingPromises = payload.siblingsIds.map(id => {
                    return Student.findByPk(id)
                    .then(student => {
                        newStudent.addSibling(student)
                        student.addSibling(newStudent)
                    });
                });
                return Promise.all(siblingPromises)
                .then(() => newStudent);
            }
            return newStudent;
        })
    )
}

function update(id, payload){
    return (
        Student.findByPk(id)
        .then((student) => {
            return (
                student.update({
                    name: payload.name,
                    lastName: payload.lastName,
                    age: payload.age,
                    gender: payload.gender,
                    RoomId: payload.roomId,
                    profileImageUrl: payload.profileImageUrl
                })
                .then((updatedStudent) => {
                    updatedStudent.setSiblings([])
                    .then(() => {
                        const promises = [];
                        if (payload.siblingsIds && payload.siblingsIds.length > 0) {
                            payload.siblingsIds.forEach(siblingId => {
                                promises.push(
                                    Student.findByPk(siblingId)
                                    .then((sibling) => {
                                        updatedStudent.addSibling(sibling);
                                        sibling.addSibling(updatedStudent);
                                    })
                                    .catch((error) => {
                                        reject(new Error('Error associating sibling'));
                                    })
                                )
                            });
                        }
                        Promise.all(promises)
                        .then(() => {
                            resolve(updatedStudent);
                        })
                        .catch((error) => {
                            reject(new Error('Error updating siblings'));
                        });
                    })
                    .catch((error) => {
                        reject(new Error('Error updating siblings'));
                    });
                })
                .catch((error) => {
                    throw new Error('Error updating student');
                })
            )
        })
        .catch((error) => {
            throw new Error('Student not found');
        })
    )
}

function deleteStudent(id) {
    return (
        Student.findByPk(id)
        .then((student) => {
            if (student) {
                return (
                    student.destroy()
                    .then(() => {
                        return `Student ID: ${id} was successfully deleted`;
                    })
                    .catch((error) => {
                        throw new Error('Error deleting student');
                    })
                );
            } else {
                throw new Error(`Student not found`);
            }
        })
        .catch((error) => {
            if (error.message === 'Error deleting student') {
                throw new Error('Error deleting student');
            } else {
                throw new Error(`Student not found`);
            }
        })
    )
}

module.exports = {StudentService: {findByPk, findAll, create, update, deleteStudent}};