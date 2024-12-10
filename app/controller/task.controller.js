const  Tasks = require('../model/task.model');


let createTask = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        })
        return
    }

    Tasks.create(req.body,(err,data)=>{
        if(err){
            res.status(500).send({
                message : err.message
            })
        }else{
            res.send(data)
        }
    })
}

let getALLTask = (req,res)=>{
    Tasks.getAll((err,data)=>{
        if (err) {
            res.status(500).send(
               {message: err.message}
            )
        }else{
            res.send(data)
        }
    })
}

let getTaskById = (req,res) =>{
    let id = parseInt(req.params.id);
    console.log(id)
    if(isNaN(id)){
        res.status(400).send({ message: "Invalid ID provided" });
        return
    }
    Tasks.getTask(id,(err,data)=>{
        if (err) {
            console.log(err.message)
            res.status(500).send(
                {message: err.message}
            )
        }else{
            res.send(data)
        }
    })
}

let updateTaskById = (req,res) =>{
    let task = req.body;
    let id = parseInt(req.params.id)
    Tasks.updateTask(task,id,(err,data)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(
                {message: err.message}
            )
        }else{
            res.send(data)
        }
    })
}

let deleteTaskById = (req,res) => {
    let id = parseInt(req.params.id);
    Tasks.deleteTask(id,(err,data)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(
                {message: err.message}
            )
        }else{
            res.send(data)
        }
    })
}

let deleteAllTask = (req,res) => {
    Tasks.deleteAll((err,data)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(
                {message: err.message}
            )
        }else{
            res.send(data)
        }
    })
}

module.exports  = {
    createTask,
    getALLTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    deleteAllTask
}