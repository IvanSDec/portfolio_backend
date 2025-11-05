import sequelize from '../utils/connect.js';
import { DataTypes } from 'sequelize';

/**
 * @author Iván Sánchez
 * @description Define el modelo de *Projects* 
* */
const Projects = sequelize.define('Projects', {
    id_project: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    dev_time:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    project_image:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName: 'Projects',
    timestamps: true,
    underscored: true,
});

export default Projects;