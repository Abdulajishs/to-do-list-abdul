let {db, runQuery } = require('../utils/db-helper')



async function initializeDatabase() {
    try {
        let userTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT  NOT NULL,
        email TEXT UNIQUE NOT NULL
        )
        `
        await runQuery(userTableQuery);
        console.log("Users table created successfully.");

        let projectTableQuery = `
        CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        is_favorite BOOLEAN DEFAULT FALSE,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
        `;

        await runQuery(projectTableQuery);
        console.log("Projects table created successfully.");

        let taskTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                description TEXT NOT NULL,
                due_date DATE NOT NULL,
                is_completed BOOLEAN DEFAULT FALSE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                project_id INTEGER NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
                )
                `;

        await runQuery(taskTableQuery);
        console.log("Tasks table created successfully.");

        let commentsTableQuery = `
        CREATE TABLE IF NOT EXISTS  comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        project_id INTEGER NOT NULL,
        task_id INTEGER,
        FOREIGN KEY (project_id) REFERENCES projects (id)  ON DELETE CASCADE,
        FOREIGN KEY (task_id) REFERENCES tasks (id)  ON DELETE CASCADE
        )
        `;

        await runQuery(commentsTableQuery);
        console.log("Comments table created successfully.");

    } catch (error) {
        console.error("Error creating tables:", error.message);
    }
}

initializeDatabase()

module.exports = db