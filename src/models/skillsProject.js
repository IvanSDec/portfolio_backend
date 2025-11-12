import sequelize from '../utils/connect.js';
import { DataTypes } from 'sequelize';
import Projects from './projects.js';
import Skills from './skills.js';

/**
 * @author Iván Sánchez
 * @description Define el modelo de *SkillsProject* (tabla de unión)
* */
const SkillsProject = sequelize.define('SkillsProject', {
    id_skills_project: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_project: {
        type: DataTypes.INTEGER,
        references: {
            model: Projects,
            key: 'id_project'
        }
    },
    id_skill: {
        type: DataTypes.INTEGER,
        references: {
            model: Skills,
            key: 'id_skill'
        }
    }
}, {
    tableName: 'SkillsProject',
    timestamps: false,
    underscored: true,
});

Projects.belongsToMany(Skills, { through: SkillsProject, foreignKey: 'id_project', as: 'skills' });
Skills.belongsToMany(Projects, { through: SkillsProject, foreignKey: 'id_skill', as: 'projects' });


export default SkillsProject;
