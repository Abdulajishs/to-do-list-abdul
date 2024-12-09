const Project = require('../model/project.model');

let createProject = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        })
        return
    }

    let project = new Project({
        name: req.body.name,
        color: req.body.color,
        is_favorite: req.body.is_favorite
    })
    Project.create(project,(err,data)=>{
        if(err){
            res.status(500).send({
                 message: err.message || "Some error occurred while creating the Project."
            })
        }else{
            res.send(data)
        }
    })
}

let getProjectById = (req,res) => {
    let id = parseInt(req.params.id)
    console.log(id)

    Project.getProject(id,(err,data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving  project with id ${id}.`
            })
        }else{
            res.send(data)
        }
    })
}

let getAllProjects = (req,res) => {
    let name = req.query.name
    Project.getProjects(name,(err,data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving  projects."
            })
        }else{
            res.send(data);
        }
    })
}

let updateProjectById = (req,res) => {
    let id = parseInt(req.params.id)
    
    Project.updateProject(req.body,id,(err,data)=>{
        if(err){
            res.status(500).send({
                 message: err.message || "Some error occurred while updating the Project."
            })
        }else{
            res.send(data)
        }
    })
}

let deleteProjectById = (req,res) => {
    let id = parseInt(req.params.id)
    
    Project.deleteProject(id,(err,data)=>{
        if(err){
            res.status(500).send({
                 message: err.message || "Some error occurred while updating the Project."
            })
        }else{
            res.send(data)
        }
    })
}

let deleteAllProject = (req,res) => {
    Project.deleteALL((err,data)=>{
        if(err){
            res.status(500).send({
                 message: err.message || "Some error occurred while updating the Project."
            })
        }else{
            res.send(data)
        }
    })
}

module.exports = {
    createProject,
    getProjectById,
    getAllProjects,
    updateProjectById,
    deleteProjectById,
    deleteAllProject
}