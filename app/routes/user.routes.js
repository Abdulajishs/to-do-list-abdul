const router = require('express').Router()
let { createUser, getAllUser, getUserById, updateUserById, deleteUserById, deleteAllUsers} = require("../controller/user.controller");

let {validation,userValidationSchema} = require("../middleware/validation.js")

router.post('/', validation(userValidationSchema) ,createUser);

router.get('/', getAllUser);

router.get('/:id', getUserById);

router.put('/:id',validation(userValidationSchema) ,updateUserById);

router.delete('/:id', deleteUserById);

router.delete('/', deleteAllUsers);

module.exports = router;