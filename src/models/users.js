import sequelize from '../utils/connect.js';
import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';

/**
 * @author Iván Sánchez
 * @description Define el modelo de *Users*
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
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] }
        }
    },
});

Users.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

Users.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

Users.addHook('afterCreate', (user) => {
    user.password = undefined; 
});


export default Users;