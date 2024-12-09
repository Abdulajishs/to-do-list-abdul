const db = require('../configDb/db');

class Project {
    constructor(project) {
        this.name = project.name,
            this.color = project.color,
            this.is_favorite = project.is_favorite
    }

    static create(newProject, result) {
        let query = `
        INSERT INTO projects (name,color,is_favorite)
        VALUES (?,?,?)`
        let values = [newProject.name, newProject.color, newProject.is_favorite];

        db.run(query, values, function (err) {
            if (err) {
                console.log(`Error inserting data: ${err.message}`);
                result(err, null);
                return
            }
            console.log("Created project:", { id: this.lastID, ...newProject });
            result(null, { id: this.lastID, ...newProject })
        })
    }

    static getProject(id,result){
        let query =`
        SELECT * FROM projects
        WHERE id = ?
        `
        let values = [id];
        console.log(id)
        db.get(query, values, (err, row) => {
            if (err) {
                console.error(`Error  reteriving project: ${err.message}`)
                result(err, null)
                return
            }
            console.log(`projects: ${JSON.stringify(row)}`)
            result(null, row)
        })
    }

    static getProjects(name, result) {
        let query = `SELECT * FROM projects`
        let values = [];
        if (name) {
            query += ` WHERE name LIKE ?`
            values.push(`%${name}%`)
        }
        db.all(query, values, (err, rows) => {
            if (err) {
                console.error(`Error  reteriving project: ${err.message}`)
                result(err, null)
                return
            }
            console.log(`projects: ${JSON.stringify(rows)}`)
            result(null, rows)
        })
    }

    static  updateProject(newProject,id,result){
        if(!id){
            console.log(`Error: cannot update without id`);
            result({message: "Project id is required"},null)
            return
        }

        let query = `
        UPDATE projects
        SET name = ?, color = ?, is_favorite = ?
        WHERE id = ?
        `
        let values = [newProject.name,newProject.color,newProject.is_favorite,id]

        db.run(query,values,function (err){
            if (err) {
                console.error(`Error updating project: ${err.message}`)
                result(err, null)
                return
            }
            if(this.changes === 0){
                console.log(`Project with id ${id} is not found.`)
                result({message: 'Project not found'},null)
                return
            }
            console.log(`projects:`,{id: this.lastID, ...newProject})
            result(null, {id,...newProject})
        })
    }

    static deleteProject(id,result){
        let query = `
        DELETE FROM projects
        WHERE id = ?
        `
        let values = [id]
        db.run(query,values,function(err){
            if(err){
                console.log(`Error deleting project with id of ${id}`);
                result(err,null);
                return
            }
            if(this.changes === 0){
                console.log(`Project with id ${id} is not found.`)
                result({message: 'Project not found'},null)
                return
            }
            console.log(`Deleted project with id: ${id}`);
            result(null,{id})
        })
    }

    static deleteALL (result){
        let query = `
        DELETE FROM projects
        `
        db.run(query,function(err){
            if(err){
                console.log(`Error deleting all projects ${err.message}`);
                result(err,null);
                return
            }
           
            console.log(`Deleted ${this.changes} projects`);
            result(null,{deleted: this.changes})
        })
    }
}

module.exports = Project;