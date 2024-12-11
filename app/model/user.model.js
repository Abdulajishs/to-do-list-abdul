const {runQuery, getAllQuery, getSingleQuery} = require('../utils/db-helper');

class User {
    constructor(user) {
        this.name = user.name,
        this.email = user.email
    }

    static async create(newUser) {
        try {
            let query = `
            INSERT INTO users (name,email)
            VALUES (? , ?)
            `
            let values = [newUser.name, newUser.email];
            let result = await runQuery(query,values);

            return {id : result.id, ...newUser}
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getAll(queryObject) {
        try {
            let query = `SELECT * FROM users `
            let values = [];
            if(Object.keys(queryObject).length > 0){
                let allowedQuery = ['name','email'];
                let col = Object.keys(queryObject)[0];
                let colData = queryObject[col]
                console.log(queryObject,col,colData)
                if(allowedQuery.includes(col)){
                    console.log('yes')
                    query+= `WHERE ${col} LIKE ?`
                    values.push(`%${colData}%`)
                }else{
                    throw new Error("Invaid query parameter");
                }
            }
            let rows = await getAllQuery(query,values);
            if(rows.length === 0) {
                throw new Error("No user found for the given query");
            }
            return rows
        } catch (error) {
            throw new Error(error.message);
        }
    } 

    static async getUser(id){
        try {
            let query = `SELECT * FROM users WHERE id = ?`;
            let values = [id]
            
            console.log(values)
            let row = await getSingleQuery(query,values);
            if(!row){
                throw new Error("User with the particular id is not found");
            }
            return row
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateUser(user,id) {
        try {
            if(!id){
                throw new Error("User Id is required");
                
            }
            let query = `UPDATE users
            SET name = ?, email = ?
            WHERE id = ?`
            // console.log(user)
            let values = [user.name, user.email, id]

            let result = await runQuery(query, values);
            console.log(result)
            if(result.changes === 0){
                throw new Error(`User with ID ${id} not found`);
            }
            return {...user}
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteUser (id){
        try {
            let query = `DELETE FROM users
            WHERE id = ?`
            let  values = [id];

            let result = await runQuery(query,values);
            if(result.changes === 0){
                throw new Error(`User with ID ${id} not found`);
            }
            return {deleted : result.changes}
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static  async deleteAll(){
        try {
            let query = `DELETE FROM users`
            let values = [];

            let result = await runQuery(query,values);
            if(result.changes === 0){
                throw new Error(`User with ID ${id} not found`);
            }
            return {deleted : result.changes}
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = User;