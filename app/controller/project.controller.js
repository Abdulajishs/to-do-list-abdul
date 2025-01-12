const Project = require('../model/project.model');

let createProject = async (req, res) => {
    try {
        if (!req.body.name || !req.body.color || !req.body.user_id) {
            res.status(400).send({
                message: "Project name and color are required."
            })
            return
        }
        let project = new Project({
            name: req.body.name,
            color: req.body.color,
            is_favorite: req.body.is_favorite,
            user_id: req.body.user_id
        })

        let data = await Project.create(project);
        logger.info(`Project is created successfully: ${req.body.name}`)

        res.status(201).send(data)
    } catch (err) {
        logger.error(`Error creating project: ${err.message}`)
        res.status(500).send({
            message: err.message || String(err) || "Some error occurred while creating the Project."
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
        logger.info(`Fetching project with ID: ${id}`);

        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error fetching project with ID ${req.params.id}: ${err.message}`);

        res.status(500).send({
            message: err.message || String(err) || `Some error occurred while retrieving  project with id ${id}.`
        })
    }
}

let getAllProjects = async (req, res) => {
    try {
        let queryObject = req.query
        if (Object.keys(queryObject).length > 0) {
            logger.info(`Fetching project with query: ${JSON.stringify(queryObject)}`);
        }
        let data = await Project.getProjects(queryObject)
        res.status(200).send(data);
    } catch (err) {
        logger.error(`Error fetching projects: ${err.message}`);
        res.status(500).send({
            message: err.message || String(err) || "Some error occurred while retrieving  projects."
        })
    }
}

let updateProjectById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let project = req.body;
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid project ID." });
        }
        if (Object.keys(project).length === 0) {
            logger.warn(`Project update failed for ID ${id}: Empty request body`);
            return res.status(400).send({
                message: "Project data cannot be empty"
            });
        }

        let data = await Project.updateProject(req.body, id)
        logger.info(`Updating project with ID ${id}: ${JSON.stringify(project)}`);

        res.status(200).send(data)

    } catch (err) {
        logger.error(`Error updating project with ID ${req.params.id}: ${err.message}`);

        res.status(500).send({
            message: err.message || String(err) || "Some error occurred while updating the Project."
        })
    }
}

let deleteProjectById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid project ID." });
        }

        logger.info(`Deleting project with ID: ${id}`);
        let data = await Project.deleteProject(id);

        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error deleting project with ID ${req.params.id}: ${err.message}`);

        res.status(500).send({
            message: err.message || String(err) || "Some error occurred while deleting the Project."
        })
    }
}

let deleteAllProject = async (req, res) => {
    try {
        logger.info("Deleting all projects");
        let data = await Project.deleteALL()
        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error deleting all projects: ${err.message}`);

        res.status(500).send({
            message: err.message || String(err) || "Some error occurred while deleting the Project."
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