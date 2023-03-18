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
			name: {
				type: DataTypes.STRING,
				allowNull: true
			},
			teacher: {
				type: DataTypes.STRING,
				allowNull: true
			}
        },
        { timestamps: false }
    );

    return Room;
}