const Project = require('../model/project.model');

let createProject = async (req, res) => {
    try {
        if (!req.body.name || !req.body.color) {
            res.status(400).send({
                message: "Project name and color are required."
            })
            return
        }
        let project = new Project({
            name: req.body.name,
            color: req.body.color,
            is_favorite: req.body.is_favorite
        })

        let data = await Project.create(project);

        res.status(201).send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Project."
        })
    }
}

let getProjectById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        // console.log(id)
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid project ID." });
        }

        let data = await Project.getProject(id)

        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || `Some error occurred while retrieving  project with id ${id}.`
        })
    }
}

let getAllProjects = async (req, res) => {
    try {
        let name = req.query.name
        let data = await Project.getProjects(name)

        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving  projects."
        })
    }
}

let updateProjectById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid project ID." });
        }

        let data = await Project.updateProject(req.body, id)
        res.status(200).send(data)

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Project."
        })
    }
}

let deleteProjectById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid project ID." });
        }
        
        let data = await Project.deleteProject(id);

        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Project."
        })
    }
}

let deleteAllProject = async (req, res) => {
    try {
        let data = await Project.deleteALL()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Project."
        })
    }
}

module.exports = {
    createProject,
    getProjectById,
    getAllProjects,
    updateProjectById,
    deleteProjectById,
    deleteAllProject
}