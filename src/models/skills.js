import sequelize from '../utils/connect.js';
import { DataTypes } from 'sequelize';

/**
 * @author Iván Sánchez
 * @description Define el modelo de *Skills* 
**/
const Skills = sequelize.define('Skills', {
    id_skill: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[0, 1, 2, 3]],
        },
    }
},
{
    tableName: 'Skills',
    timestamps: true,
    underscored: true,
});

export default Skills;
