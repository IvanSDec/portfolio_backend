import sequelize from '../utils/connect.js';
import { DataTypes } from 'sequelize';

/**
 * @author Iván Sánchez
 * @description Define el modelo de *Gallery Projects* 
* */
const GalleryProjects = sequelize.define('GalleryProjects', {
    id_gallery_project: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_project : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url_image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName: 'GalleryProjects',
    timestamps: true,
    underscored: true,
});

export default GalleryProjects;