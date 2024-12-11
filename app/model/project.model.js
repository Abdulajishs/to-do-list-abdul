const db = require('../configDb/db');
let { runQuery, getAllQuery, getSingleQuery } = require('../utils/db-helper')

class Project {
    constructor(project) {
        this.name = project.name,
            this.color = project.color,
            this.is_favorite = project.is_favorite
    }

    static async create(newProject) {
        try {
            let query = `
            INSERT INTO projects (name,color,is_favorite)
            VALUES (?,?,?)`
            let values = [newProject.name, newProject.color, newProject.is_favorite];
            let result = await runQuery(query, values)

            return { id: result.id, ...newProject }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getProject(id) {
        try {
            let query = `
            SELECT * FROM projects
            WHERE id = ?
            `
            let values = [id];

            let row = await getSingleQuery(query, values);

            return row
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getProjects(name) {
        try {
            let query = `SELECT * FROM projects`
            let values = [];
            if (name) {
                query += ` WHERE name LIKE ?`
                values.push(`%${name}%`)
            }

            let rows = await getAllQuery(query, values);
            return rows
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateProject(newProject, id) {
        try {
            if (!id) {
                throw new Error('Project ID is required');
            }

            let query = `
            UPDATE projects
            SET name = ?, color = ?, is_favorite = ?
            WHERE id = ?
            `
            let values = [newProject.name, newProject.color, newProject.is_favorite, id]

            let result = await runQuery(query, values);

            if (result.changes === 0) {
                throw new Error('Project not found');
            }
            return { id, ...newProject }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteProject(id) {
        try {
            let query = `
            DELETE FROM projects
            WHERE id = ?
            `
            let values = [id]

            let result = await runQuery(query, values);

            if (result.changes === 0) {
                throw new Error(`Error deleting project with id of ${id}`);
            }

            return { id }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteALL() {
        try {
            let query = `DELETE FROM projects`
            let result = await runQuery(query)

            return { deleted: result.changes }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Project;