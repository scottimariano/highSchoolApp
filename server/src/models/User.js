const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			mail: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
			},
			password: {
                type: DataTypes.STRING,
                allowNull: false
			}
        },
        { timestamps: false }
    );

	return User;
}

