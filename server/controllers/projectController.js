const Project = require("../models/projectModel")

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({
            success: true,
            message: 'Retriveing Projects',
            projects
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

const getProjectsCount = async (req, res) => {
    try {
        const projectsCount = await Project.countDocuments({status: 'On Going'});
        res.status(200).json({
            success: true,
            message: 'Retriveing Projects',
            projectsCount
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

const getProjectsById = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findById({ _id: id }).exec();
        if (!project) return res.status(404).json({
            success: false,
            message: `Project not found`,
        })
        res.status(200).json({
            success: true,
            message: `Finding the the projcet`,
            project
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

const createNewProject = async (req, res) => {
    try {
        // const { name, description, manager, members, deadline} = req.body
        const newProject = {status: 'Not Started', ...req.body}
        
        const project = new Project(newProject)
        await project.save();
        console.log('project: ', project)
        res.status(200).json({
            success: true,
            message: 'Successfully created new project',
            project
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

const updateProject = async (req, res) => {
    try {
        const { id } = req.params
        const update = req.body

        const project = await Project.findOneAndUpdate({ _id: id }, update, { new: true });
        if (!project) return res.status(404).json({
            success: false,
            message: `Fail to find project`,
        })

        console.log('project: ', project)
        res.status(200).json({
            success: true,
            message: 'Project updated Successfully',
            project
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findById({ _id: id }).exec();

        if (!project) return res.status(404).json({
            success: false,
            message: `Project not found`,
        });

        project.isDelete = true;
        await project.save()

        console.log('project: ', project)
        res.status(200).json({
            success: true,
            message: 'Project delition successfull',
            project
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

module.exports = {
    getProjects,
    getProjectsCount,
    getProjectsById,
    createNewProject,
    updateProject,
    deleteProject
}