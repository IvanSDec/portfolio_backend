const sequelize = require('../utils/connect');
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

/**
 * @author Iván Sánchez
 * @description define *Users* model
 * */
const Users = sequelize.define('Users', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    photo : {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    status : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rol : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: 'Users',
    timestamps: true,
    underscored: true,
});

Users.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

module.exports = Users;