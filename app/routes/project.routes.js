const express = require('express');
const router = express.Router();

const project = require("../controller/project.controller")

router.post('/', project.createProject);

router.get('/', project.getAllProjects);

router.get('/:id', project.getProjectById);

router.put('/:id',project.updateProjectById);

router.delete('/:id',project.deleteProjectById);

router.delete('/',project.deleteAllProject);




module.exports = router;