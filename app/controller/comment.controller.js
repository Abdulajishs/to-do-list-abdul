const Comment = require('../model/comment.model');

let createComment = async (req, res) => {
    try {
        const { content, project_id, task_id } = req.body;
        if (!content || (!project_id && !task_id)) {
            return res.status(400).send({
                message: "Comment must have content and at least one of project_id or task_id."
            });
        }
        let data = await Comment.create(req.body);

        res.status(201).send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the User."
        })
    }
}

let getAllComment = async (req,res) => {
    try {
        let queryObject = req.query;
        let data = await Comment.getComments(queryObject)

        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving  comments."
        })
    }
}

let updateCommentById = async (req,res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid Comment ID." });
        }

        let data = await Comment.updateComment(req.body, id)
        res.status(200).send(data)

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Comment."
        })
    }
}

let deleteCommentById = async(req,res)=>{
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid Comment ID." });
        }
        
        let data = await Comment.deleteComment(id);

        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Comment."
        })
    }
}

let deleteAllComment = async (req,res) => {
    try {
        let data = await Comment.deleteALL()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Comments."
        })
    }
}

module.exports = {
    createComment,
    getAllComment,
    updateCommentById,
    deleteCommentById,
    deleteAllComment
}