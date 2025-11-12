import Projects from '../models/projects.js';
import GalleryProjects from '../models/galleryProject.js';

const projectsCtrl = {};

projectsCtrl.getAllProjects = async (req, res) => {
    try {
        const projects = await Projects.findAll({
            include: [{
                model: GalleryProjects,
                as: 'gallery'
            }]
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los proyectos", error });
    }
};

projectsCtrl.getProjectById = async (req, res) => {
    try {
        const project = await Projects.findByPk(req.params.id, {
            include: [{
                model: GalleryProjects,
                as: 'gallery'
            }]
        });
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el proyecto", error });
    }
};

projectsCtrl.createProject = async (req, res) => {
    const { name, company, state, project_date, dev_time, description, technologies } = req.body;
    const project_image = req.file ? req.file.path : null;
    const gallery_images = req.files && req.files.gallery ? req.files.gallery.map(file => file.path) : [];

    if (!project_image) {
        return res.status(400).json({ message: "La imagen principal es requerida." });
    }

    try {
        const newProject = await Projects.create({
            name,
            company,
            state,
            project_date,
            dev_time,
            description,
            technologies,
            project_image
        });

        if (gallery_images.length > 0) {
            const gallery = gallery_images.map(url => ({
                id_project: newProject.id_project,
                url_image: url
            }));
            await GalleryProjects.bulkCreate(gallery);
        }

        res.status(201).json({ message: "Proyecto creado exitosamente", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el proyecto", error });
    }
};

projectsCtrl.updateProject = async (req, res) => {
    try {
        const project = await Projects.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        await project.update(req.body);
        res.status(200).json({ message: "Proyecto actualizado exitosamente", project });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el proyecto", error });
    }
};

projectsCtrl.deleteProject = async (req, res) => {
    try {
        await GalleryProjects.destroy({
            where: { id_project: req.params.id }
        });
        const deleted = await Projects.destroy({
            where: { id_project: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        res.status(200).json({ message: "Proyecto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el proyecto", error });
    }
};

export default projectsCtrl;
