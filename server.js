const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8080;
const logger = require("./app/utils/logger");
const requestLogger = require("./app/middleware/logger");
const errorHandler = require('./app/middleware/errorHandler');

const app = express();

const corsOption = {
    origin: ['http://localhost:3000', 'http://localhost:8081']
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use(requestLogger)

process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection: ${reason}`, { promise });
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
});

// import user router
let userRouter = require(path.join(__dirname, 'app', 'routes', 'user.routes.js'));
app.use('/todolist/users', userRouter)

// import project router
let projectRouter = require(path.join(__dirname, 'app', 'routes', 'project.routes.js'));
app.use('/todolist/projects', projectRouter)

// import task router
let taskRouter = require(path.join(__dirname, 'app', 'routes', 'task.routes.js'))
app.use('/todolist/tasks', taskRouter)

// import comment router
let commentRouter = require(path.join(__dirname, 'app', 'routes', 'comment.routes.js'))
app.use('/todolist/comments', commentRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to todolist' })
})

// Global error handling middleware  
app.use(errorHandler)

app.listen(port, () => {
    logger.info(`server started on http://localhost:${port}`)
    console.log(`http://localhost:${port}`)
})