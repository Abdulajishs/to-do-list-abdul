const User = require('../model/user.model');
const logger = require('../utils/logger')

let createUser = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email) {
            res.status(400).send({
                message: "User name and email are  required"
            })
            return
        }

        let data = await User.create(req.body);
        logger.info(`User is created successfully: ${req.body.name}`)
        res.status(201).send(data)
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`)
        res.status(500).send({
            message: error.message || String(err) || "Some error occurred while creating the User."
        })
    }
}

let getAllUser = async (req, res) => {
    try {
        let queryObject = req.query;
        if (Object.keys(queryObject).length !== 0) {
            logger.info(`Fetching users with query: ${JSON.stringify(queryObject)}`);
        }
        let data = await User.getAll(queryObject);
        res.status(200).send(data)
    } catch (error) {
        logger.error(`Error fetching users: ${error.message}`);
        res.status(500).send({
            message: error.message || String(err) || "Some error occurred while getting the Users."
        })
    }
}

let getUserById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let data = await User.getUser(id);
        logger.info(`Fetching user with ID: ${id}`);
        res.status(200).send(data)
    } catch (error) {
        logger.error(`Error fetching user with ID ${req.params.id}: ${error.message}`);
        res.status(500).send({
            message: error.message || String(err) || "Some error occurred while getting the User."
        })
    }
}

let updateUserById = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let user = req.body;
        // console.log(user,id)
        if (Object.keys(user).length === 0) {
            logger.warn(`User update failed for ID ${id}: Empty request body`);
            return res.status(400).send({
                message: "User data cannot be empty"
            });
        }

        let data = await User.updateUser(user, id);
        logger.info(`Updating user with ID ${id}: ${JSON.stringify(user)}`);
        res.status(200).send(data)
    } catch (error) {
        logger.error(`Error updating user with ID ${req.params.id}: ${error.message}`);
        res.status(500).send({
            message: error.message || String(err) || "Some error occurred while updating the User."
        })
    }
}

let deleteUserById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        logger.info(`Deleting user with ID: ${id}`);
        let data = User.deleteUser(id)
        res.status(200).send(data)
    } catch (error) {
        logger.error(`Error deleting user with ID ${req.params.id}: ${error.message}`);
        res.status(500).send({
            message: error.message || String(err) || "Some error occurred while deleting the User."
        })
    }
}

let deleteAllUsers = async (req, res) => {
    try {
        logger.info("Deleting all users");
        let data = User.deleteAll()
        res.status(200).send(data)
    } catch (error) {
        logger.error(`Error deleting all users: ${error.message}`);
        res.status(500).send({
            message: error.message || String(err) || "Some error occurred while deleting the User."
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