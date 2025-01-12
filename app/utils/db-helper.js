const sqlite3 = require('sqlite3');
const path = require('path');
const logger = require('./logger')

const db = new sqlite3.Database(path.join(__dirname,"..","..","test.db"), (err) => {
    if (err) {
        logger.error(`Error connecting to the database: ${err.message}`);
    } else {
        logger.info('Successfully connected to SQLite3 database');
    }
    db.run('PRAGMA foreign_keys = ON;', (err) => {
        if (err) {
            logger.error(`Error enabling foreign keys: ${err.message}`);
        } else {
            logger.info('Foreign keys enabled.');
        }
    });
})

function runQuery(query,values = []) {
    return new Promise((resolve, reject) => {
        db.run(query,values,function (err) {
            if (err) {
                logger.error(`Error executing query: ${query}, values: ${values}, error: ${err.message}`);
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
                logger.error(`Error executing query: ${query}, values: ${values}, error: ${err.message}`);
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
                logger.error(`Error executing query: ${query}, values: ${values}, error: ${err.message}`);
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