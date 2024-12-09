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


app.get('/',(req,res)=>{
    res.json({message: 'Welcome to todolist'})
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})