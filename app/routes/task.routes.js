const express = require('express');
const router = express.Router();

let { validation, taskValidationSchema } = require("../middleware/validation.js")

const task = require("../controller/task.controller")

router.post('/', validation(taskValidationSchema), task.createTask);

router.get('/', task.getALLTask);

router.get('/:id', task.getTaskById);

router.get('/project/:projectId', task.getTasksByProjectId);

router.put('/:id', validation(taskValidationSchema), task.updateTaskById);

router.delete('/:id', task.deleteTaskById);

router.delete('/', task.deleteAllTask);


module.exports = router;