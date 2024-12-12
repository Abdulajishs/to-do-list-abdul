const { runQuery, getAllQuery, getSingleQuery } = require('../utils/db-helper');

class Comment {
    constructor(comment) {
        this.content = comment.content,
            this.project_id = comment.project_id,
            this.task_id = comment.task_id
    }

    static async create(newComment) {
        try {
            let query = `
            INSERT INTO comments (content,project_id,task_id)
            VALUES (? , ?, ?)
            `
            let values = [newComment.content, parseInt(newComment.project_id), parseInt(newComment.task_id)];
            let result = await runQuery(query, values);

            return { id: result.id, ...newComment }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getComments(queryObject) {
        try {
            let query = `SELECT * FROM comments`
            let values = [];
            if (Object.keys(queryObject).length > 0) {
                let allowedColumns = ['content', 'project_id', 'task_id'];
                let conditions = [];

                for(let [key,value] of Object.entries(queryObject)){
                    if (allowedColumns.includes(key)) {
                        conditions.push(`${key} LIKE ?`)
                        values.push(`%${value}%`)
                    } else {
                        throw new Error(`Invalid query parameter ${key}`)
                    }
                }

                if(conditions.length > 0){
                    query += ` WHERE ` + conditions.join(` AND `)
                }

            }
            console.log(query,values);

            let rows = await getAllQuery(query, values);
            if (rows.length === 0) {
                throw new Error(`No task found for the given query`)
            }

            return rows
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateComment(newComment, id) {
        try {
            if (!id) {
                throw new Error('Comment ID is required');
            }

            let query = `
            UPDATE comments
            SET content = ?, project_id = ?, task_id = ?
            WHERE id = ?
            `
            let values = [newComment.content, newComment.project_id, newComment.task_id, id]

            let result = await runQuery(query, values);

            if (result.changes === 0) {
                throw new Error('Comment not found');
            }
            return { id, ...newComment }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteComment(id) {
        try {
            let query = `
            DELETE FROM comments
            WHERE id = ?
            `
            let values = [id]

            let result = await runQuery(query, values);

            if (result.changes === 0) {
                throw new Error(`Error deleting Comment with id of ${id}`);
            }

            return { id }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteALL() {
        try {
            let query = `DELETE FROM comments`
            let result = await runQuery(query)

            return { deleted: result.changes }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Comment