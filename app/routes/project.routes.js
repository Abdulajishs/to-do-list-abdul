const express = require('express');
const router = express.Router();
let { validation, projectValidationSchema } = require("../middleware/validation.js")


const project = require("../controller/project.controller")

router.post('/', validation(projectValidationSchema), project.createProject);

router.get('/', project.getAllProjects);

router.get('/:id', project.getProjectById);

router.put('/:id', validation(projectValidationSchema), project.updateProjectById);

router.delete('/:id', project.deleteProjectById);

router.delete('/', project.deleteAllProject);




module.exports = router;