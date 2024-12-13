const sqlite3 = require('sqlite3');
let path = require('path');

const db = new sqlite3.Database(path.join(__dirname,"..","..","test.db"), (err) => {
    if (err) {
        console.error(`Error connecting to the database : ${err.message}`)
    } else {
        console.log('Successfully connected to sqlite3 database');
    }
    db.run('PRAGMA foreign_keys = ON;', (err) => {
        if (err) {
            console.error('Error enabling foreign keys:', err.message);
        } else {
            console.log('Foreign keys enabled.');
        }
    });
})

function runQuery(query,values = []) {
    return new Promise((resolve, reject) => {
        db.run(query,values,function (err) {
            if (err) {
                reject(err)
            }else {
                resolve({id:this.lastID, changes: this.changes})
            }
        })
    })
}

function getAllQuery(query,values = []) {
    return new Promise((resolve, reject) => {
        db.all(query,values,function (err,rows) {
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}

function getSingleQuery(query, values = []) {
    return new Promise((resolve, reject) => {
        db.get(query, values, function (err,row){
            if(err){
                reject(err)
            }else{
                resolve(row)
            }
        })
    })
}

module.exports = {
    db,
    runQuery,
    getAllQuery,
    getSingleQuery
}