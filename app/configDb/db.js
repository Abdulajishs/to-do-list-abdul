const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./todolist.db',(err)=>{
    if(err){
        console.error(`Error connecting to the database : ${err.message}`)
    }else{
        console.log('Successfully connected to sqlite3 database');
    }
})

db.serialize(()=>{
    let projectTableQuery = `
    CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE
    )
    `;
    db.run(projectTableQuery,(err)=>{
        if(err){
            console.error("Error creating project table:", err.message);
        } else {
            console.log("project table created successfully.");
        }
    })

    let taskTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        description TEXT NOT NULL,
        due_date DATETIME NOT NULL,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        project_id INTEGER NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
        )
        `;
        db.run(taskTableQuery,(err)=>{
            if(err){
                console.error("Error creating tasks table:", err.message);
            } else {
                console.log("tasks table created successfully.");
            }
        })
})