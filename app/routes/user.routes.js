const router = require('express').Router()
let { createUser, getAllUser, getUserById, updateUserById, deleteUserById, deleteAllUsers} = require("../controller/user.controller");


router.post('/', createUser);

router.get('/', getAllUser);

router.get('/:id', getUserById);

router.put('/:id', updateUserById);

router.delete('/:id', deleteUserById);

router.delete('/', deleteAllUsers);

module.exports = router;