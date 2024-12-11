const Tasks = require('../model/task.model');


let createTask = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content cannot be empty"
            })
            return
        }

        let data = await Tasks.create(req.body)
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

let getALLTask = async (req, res) => {
    try {
        let queryObject = req.query;
        let data = await Tasks.getAll(queryObject);
        res.status(200).send(data)
    } catch (err) {
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
            res.status(400).send({ message: "Invalid ID provided" });
            return
        }
        let data = await Tasks.getTask(id);
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(
            { message: err.message }
        )
    }
}

let updateTaskById = async (req, res) => {
    try {
        let task = req.body;
        let id = parseInt(req.params.id)

        if (!task || Object.keys(task).length === 0) {
            return res.status(400).send({
                message: "Task data cannot be empty"
            });
        }
        
        let data = await Tasks.updateTask(task, id)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(
            { message: err.message }
        )
    }
}

let deleteTaskById = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let data = await Tasks.deleteTask(id)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(
            { message: err.message }
        )
    }
}

let deleteAllTask = async (req, res) => {
    try {
        let data =await Tasks.deleteAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(
            { message: err.message }
        )
    }
}

module.exports = {
    createTask,
    getALLTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    deleteAllTask
}