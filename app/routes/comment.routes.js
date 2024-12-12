const router = require('express').Router()
let { createComment, getAllComment, getCommentByTaskId, getCommentByProjectId, updateCommentById, deleteCommentById, deleteAllComment} = require("../controller/comment.controller");

let { validation, commentValidationSchema } = require("../middleware/validation.js")

router.post('/', validation(commentValidationSchema), createComment);

router.get('/', getAllComment);

router.put('/:id', validation(commentValidationSchema), updateCommentById);

router.delete('/:id', deleteCommentById);

router.delete('/', deleteAllComment);


module.exports = router;