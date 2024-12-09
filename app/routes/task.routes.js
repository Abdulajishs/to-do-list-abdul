const express = require('express');
const router = express.Router();

const task = require("../controller/task.controller")

router.post('/',task.createTask);

router.get('/',task.getALLTask);

router.get('/:id',task.getTaskById);

router.put('/:id',task.updateTaskById);

router.delete('/:id',task.deleteTaskById);

router.delete('/',task.deleteAllTask);


module.exports = router;