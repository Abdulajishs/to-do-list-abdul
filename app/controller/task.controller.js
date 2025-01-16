const Tasks = require('../model/task.model');
const logger = require('../utils/logger');


let createTask = async (req, res) => {
    try {
        if (!req.body) {
            logger.warn("Create task request failed: Empty request body");
            res.status(400).send({
                message: "Content cannot be empty"
            })
            return
        }

        let data = await Tasks.create(req.body)
        logger.info(`Task created successfully: ${JSON.stringify(req.body)}`);
        res.status(201).send(data);
    } catch (error) {
        logger.error(`Error creating task: ${error.message}`);
        res.status(500).send({
            message: error.message
        })
    }
}

let getALLTask = async (req, res) => {
    try {
        let queryObject = req.query;
        if (Object.keys(queryObject).length > 0) {
            logger.info(`Fetching tasks with query: ${JSON.stringify(queryObject)}`);
        } else {
            logger.info("Fetching all tasks without filters");
        }
        let data = await Tasks.getAll(queryObject);
        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error fetching tasks: ${err.message}`);
        res.status(500).send(
            { message: err.message }
        )
    }
}

let getTaskById = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        console.log(id)
        if (isNaN(id)) {
            logger.warn("Invalid task ID provided for fetching");
            res.status(400).send({ message: "Invalid ID provided" });
            return
        }
        logger.info(`Fetching task with ID: ${id}`);
        let data = await Tasks.getTask(id);
        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error fetching task with ID ${req.params.id}: ${err.message}`);
        res.status(500).send(
            { message: err.message }
        )
    }
}

let getTasksByProjectId = async (req, res) => {
    try {
        let projectId = parseInt(req.params.projectId);
        console.log(typeof projectId)
        if (isNaN(projectId)) {
            logger.warn("Invalid project ID provided for fetching");
            res.status(400).send({ message: "Invalid ID provided" });
            return
        }
        logger.info(`Fetching tasks with project ID: ${projectId}`);
        let data = await Tasks.getTasksByProject(projectId);
        res.status(200).send(data)
    } catch (error) {
        logger.error(`Error fetching task with ID ${req.params.projectId}: ${error.message}`);
        res.status(500).send(
            { message: error.message }
        )
    }
}

let updateTaskById = async (req, res) => {
    try {
        let task = req.body;
        let id = parseInt(req.params.id)

        if (!task || Object.keys(task).length === 0) {
            logger.warn(`Update task failed for ID ${id}: Empty request body`);
            return res.status(400).send({
                message: "Task data cannot be empty"
            });
        }

        logger.info(`Updating task with ID ${id}: ${JSON.stringify(task)}`);
        let data = await Tasks.updateTask(task, id)
        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error updating task with ID ${req.params.id}: ${err.message}`);
        res.status(500).send(
            { message: err.message }
        )
    }
}

let deleteTaskById = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            logger.warn("Invalid task ID provided for deletion");
            res.status(400).send({ message: "Invalid ID provided" });
            return;
        }
        logger.info(`Deleting task with ID: ${id}`);
        let data = await Tasks.deleteTask(id)
        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error deleting task with ID ${req.params.id}: ${err.message}`);
        res.status(500).send(
            { message: err.message }
        )
    }
}

let deleteAllTask = async (req, res) => {
    try {
        logger.info("Deleting all tasks");
        let data = await Tasks.deleteAll()
        res.status(200).send(data)
    } catch (err) {
        logger.error(`Error deleting all tasks: ${err.message}`);
        res.status(500).send(
            { message: err.message }
        )
    }
}

module.exports = {
    createTask,
    getALLTask,
    getTaskById,
    getTasksByProjectId,
    updateTaskById,
    deleteTaskById,
    deleteAllTask
}