const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

const corsOption = {
    origin : 'http://localhost:8081'
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOption));

// import user router
let userRouter = require(path.join(__dirname,'app','routes','user.routes.js'));
app.use('/todolist/users',userRouter)

// import project router
let projectRouter = require(path.join(__dirname,'app','routes','project.routes.js'));
app.use('/todolist/projects',projectRouter)

// import task router
let taskRouter = require(path.join(__dirname,'app','routes','task.routes.js'))
app.use('/todolist/tasks',taskRouter)

app.get('/',(req,res)=>{
    res.json({message: 'Welcome to todolist'})
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})