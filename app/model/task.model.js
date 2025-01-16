let db = require("../configDb/db");
let { runQuery, getAllQuery, getSingleQuery } = require('../utils/db-helper')

class Tasks {
    constructor(task) {
        this.content = task.content,
            this.description = task.description,
            this.due_date = task.due_date,
            this.is_completed = task.is_completed,
            this.project_id = task.project_id
    }

    static async create(newTask) {
        try {
            let validationQuery = `SELECT id FROM projects WHERE id = ?`
            let id = parseInt(newTask.project_id)

            let project = await getSingleQuery(validationQuery, id)

            if (!project) {
                throw new Error('Project Id not found')
            }

            let query = `
            INSERT INTO tasks (content,description,due_date,is_completed,project_id)
            values(?,?,?,?,?)
            `
            let values = [newTask.content, newTask.description, newTask.due_date, newTask.is_completed, newTask.project_id];

            let result = await runQuery(query, values)

            return { id: result.id, ...newTask }

        } catch (error) {
            throw new Error(error.message)
        }

    }

    static async getAll(queryObject) {
        try {
            let query = `SELECT * FROM tasks`;
            let values = []


            if (Object.keys(queryObject).length > 0) {
                let allowedColumns = ['content', 'description', 'due_date', 'is_completed', 'created_at', 'project_id']
                let conditions = [];

                for (let [key, value] of Object.entries(queryObject)) {
                    if (allowedColumns.includes(key)) {
                        conditions.push(`${key} LIKE ? `)
                        values.push(value)
                    } else {
                        throw new Error(`Invalid query parameter ${key}`)
                    }
                }

                if (conditions.length > 0) {
                    query += ` WHERE ` + conditions.join(` AND `)
                }

                // let key = Object.keys(queryObject);
                // let col = key[0];
                // let colData = queryObject[key[0]];
                // let allowedColumns = ['content', 'description', 'due_date', 'is_completed', 'created_at', 'project_id']

                // if (allowedColumns.includes(col)) {   //prevent sql injection
                //     query += ` WHERE ${col} LIKE ?`
                //     values.push(`%${colData}%`)
                // } else {
                //     throw new Error(`Invalid query parameter`)
                // }
            }

            let rows = await getAllQuery(query, values);
            if (rows.length === 0) {
                throw new Error(`No task found for the given query`)
            }

            return rows
        } catch (error) {
            throw new Error(error.message);
        }

    }

    static async getTask(id) {
        try {
            let query = `
            SELECT * FROM tasks
            WHERE id = ?
            `
            let values = [id];

            let row = await getSingleQuery(query, values);
            return row
        } catch (error) {
            throw new Error(`Task with ID ${id} not found`);
        }
    }

    static async getTasksByProject(projectId) {
        try {
            let query = ` SELECT * FROM tasks WHERE project_id = ? `
            let values = [projectId]

            let rows = await getAllQuery(query, values);

            if (rows.length === 0) {
                return []
            }

            return rows

        } catch (error) {
            throw new Error(`Project with ID ${projectId} not found`);
        }
    }

    static async updateTask(newTask, id) {
        try {
            let validationQuery = `SELECT id FROM projects WHERE id = ?`
            let row = await getSingleQuery(validationQuery, [parseInt(newTask.project_id)])
            if (!row) {
                throw new Error("Error validating id");
            }

            let query = `
        UPDATE tasks
        SET content = ?, description = ?, due_date = ?, is_completed = ?, project_id = ?
        WHERE id = ?
        `
            let values = [newTask.content, newTask.description, newTask.due_date, newTask.is_completed, newTask.project_id, id];

            let result = await runQuery(query, values)

            if (result.changes === 0) {
                throw new Error(`Task with ID ${id} not found`);
            }

            return { id, ...newTask }

        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async deleteTask(id) {
        try {
            let query = `DELETE FROM tasks
            WHERE id = ?`
            let values = [id]
            let result = await runQuery(query, values)
            if (result.changes === 0) {
                throw new Error(`Task with id ${id} is not found.`);
            }
            return { id }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteAll() {
        try {
            let query = `DELETE FROM tasks`
            let result = await runQuery(query)

            return { deleted: result.changes }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Tasks;