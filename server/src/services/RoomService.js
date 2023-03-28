const { Sequelize } = require('sequelize');
const { Room, Student } = require('../db');

function findByPk(id){
    
    return (
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
    )
}

function findAll(nameFilter){
    return (
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
    )
}

function create(name, teacher){
    
    return (
        Room.create({
            name,
            teacher
        })
    )
}

function update(id, name, teacher){
    return (
        Room.findByPk(id)
        .then((room)=>{
            if(!room){
                throw new Error("Room Not found");
            }
            room.update(
                {
                    name,
                    teacher
                }
            )
        })
    )
}

function deleteRoom(id){
    return (
        Room.findByPk(id)
        .then((room) => {
            if(!room){
                throw new Error("Room Not found");
            }
            room.destroy()
        })
    )
}
module.exports = {RoomService: {findByPk, findAll, create, update, deleteRoom}};