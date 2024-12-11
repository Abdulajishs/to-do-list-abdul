const User = require('../model/user.model');

let createUser = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email) {
            res.status(400).send({
                message: "User name and email are  required"
            })
            return
        }

        let data = await User.create(req.body);

        res.status(201).send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the User."
        })
    }
}

let getAllUser = async (req, res) => {
    try {
        let queryObject = req.query;
        let data = await User.getAll(queryObject);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while getting the Users."
        })
    }
}

let getUserById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let data = await User.getUser(id);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while getting the User."
        })
    }
}

let updateUserById = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let user = req.body;
        // console.log(user,id)
        if(Object.keys(user).length === 0){
            return res.status(400).send({
                message: "User data cannot be empty"
            });
        }

        let data = await User.updateUser(user,id);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the User."
        })
    }
}

let deleteUserById  = async(req,res)=>{
    try {
        let id = parseInt(req.params.id)

        let data = User.deleteUser(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting the User."
        })
    }
}

let deleteAllUsers = async (req,res) => {
    try {
        let data = User.deleteAll()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting the User."
        })
    }
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
    deleteAllUsers
}