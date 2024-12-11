const db = require('../configDb/db');

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
            if(er){
                reject(err)
            }else{
                resolve(row)
            }
        })
    })
}

module.exports = {
    runQuery,
    getAllQuery,
    getSingleQuery
}