const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Room = sequelize.define(
		'Room',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			Name: {
				type: DataTypes.STRING,
				allowNull: true
			},
			Teacher: {
				type: DataTypes.STRING,
				allowNull: true
			},
            
        },
        { timestamps: false }
    );

    return Room;
}