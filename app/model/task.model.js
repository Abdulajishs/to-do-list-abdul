let db = require("../configDb/db");

class Tasks {
    constructor(task) {
        this.content = task.content,
            this.description = task.description,
            this.due_date = task.due_date,
            this.is_completed = task.is_completed,
            this.project_id = task.project_id
    }

    static create(newTask, result) {

        let validationQuery = `SELECT id FROM projects WHERE id = ?`
        let id = parseInt(newTask.project_id)
        db.get(validationQuery, [id], (err, row) => {
            if (err) {
                console.log('Error validating id ', err.message)
                result(err, null)
                return
            }
            if (!row) {
                result({ message: 'Project Id not found' });
                return
            }
            let query = `
            INSERT INTO tasks (content,description,due_date,is_completed,project_id)
            values(?,?,?,?,?)
            `
            let values = [newTask.content, newTask.description, newTask.due_date, newTask.is_completed, newTask.project_id];
            db.run(query, values, function (err) {
                if (err) {
                    console.log(`Errro inserting data in tasks, ${err.message}`);
                    result(err, null)
                    return
                }

                result(null, { id: this.lastID, ...newTask })
            })
        })
    }

    static getAll(result) {
        let query = `
        SELECT * FROM tasks
        `
        db.all(query, (err, rows) => {
            if (err) {
                console.log(`Error getting tasks ${err.message}`, null)
                result(err.message, null)
                return
            }
            result(null, rows)
        })
    }

    static getTask(id, result) {
        let query = `
        SELECT * FROM tasks
        WHERE id = ?
        `
        let values = [id];

        db.get(query, values, (err, row) => {
            if (err) {
                console.log(`Error retriving task: ${err.message}`)
                result(err.message, null);
                return
            }
            if (!row) {
                result({ message: `Task with ID ${id} not found` }, null);
                return;
            }
            result(null, row)
        })
    }

    static updateTask(newTask, id, result) {
        let validationQuery = `SELECT id FROM projects WHERE id = ?`
        db.get(validationQuery, [parseInt(newTask.project_id)], (err, row) => {
            if (err) {
                console.log('Error validating id ', err.message)
                result(err, null)
                return
            }
            if (!row) {
                result({ message: 'Project Id not found' });
                return
            }

            let query = `
        UPDATE tasks
        SET content = ?, description = ?, due_date = ?, is_completed = ?, project_id = ?
        WHERE id = ?
        `
            let values = [newTask.content, newTask.description, newTask.due_date, newTask.is_completed, newTask.project_id, id];


            db.run(query, values, function (err) {
                if (err) {
                    console.error(`Error updating tasks: ${err.message}`)
                    result(err, null)
                    return
                }
                if (this.changes === 0) {
                    console.log(`Task with id ${id} is not found.`)
                    result({ message: 'Task with id not found' }, null)
                    return
                }
                console.log(`task:`, { id, ...newTask })
                result(null, { id, ...newTask })
            })
        })
    }

    static deleteTask (id,result){
        let query = `DELETE FROM tasks
        WHERE id = ?`
        let values = [id]
        db.run(query,values,function(err){
            if (err) {
                console.log(`Error deleting task with id of ${id}`);
                result(err,null);
                return
            }
            if(this.changes === 0){
                console.log(`Task with id ${id} is not found.`)
                result({message: 'Task not found'},null)
                return
            }
            console.log(`Deleted task with id: ${id}`);
            result(null,{id})
        })
    }

    static deleteAll (result){
        let query = `DELETE FROM tasks`
        db.run(query,function(err){
            if(err){
                console.log(`Error deleting all tasks ${err.message}`);
                result(err,null);
                return
            }
           
            console.log(`Deleted ${this.changes} projects`);
            result(null,{deleted: this.changes})
        })
    }
}

module.exports = Tasks;