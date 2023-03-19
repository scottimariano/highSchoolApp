const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Student = sequelize.define(
		'Student',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			gender: {
				type: DataTypes.STRING,
				allowNull: false
			},
			profileImageUrl: {
				type: DataTypes.STRING,
				allowNull: true
			}
        },
        { timestamps: false }
    );

	return Student;
}