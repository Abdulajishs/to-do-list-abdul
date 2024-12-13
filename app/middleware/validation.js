const yup = require('yup');

const userValidationSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(1, "Name cannot be empty"),
    email: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email address"),
}).noUnknown(true, "Unknown fields are not allowed");


const projectValidationSchema = yup.object({
    name: yup
        .string()
        .required("Project name is required"),
    color: yup
        .string()
        .required("Color is required"),
    is_favorite: yup
        .boolean(),
        // .default(false), // Optional; defaults to false
    user_id: yup
        .number()
        .required("User ID is required")
        .integer("User ID must be an integer")
        .positive("User ID must be a positive number"),
}).noUnknown(true, "Unknown fields are not allowed")


const taskValidationSchema = yup.object({
    content: yup
        .string()
        .required("Content is required"),
    description: yup
        .string()
        .required("Description is required"),
    due_date: yup
        .date()
        .required("Due date is required")
        .typeError("Invalid date format"),
    is_completed: yup
        .boolean()
        .default(false),
    project_id: yup
        .number()
        .required("Project ID is required")
        .integer("Project ID must be an integer")
        .positive("Project ID must be a positive number"),
}).noUnknown(true, "Unknown fields are not allowed");

const commentValidationSchema = yup.object({
    content: yup
        .string()
        .required("Content is required"),
    project_id: yup
        .number()
        .required("Project ID is required")
        .integer("Project ID must be an integer")
        .positive("Project ID must be a positive number"),
    task_id: yup
        .number()
        .nullable()
        .integer("Task ID must be an integer")
        .positive("Task ID must be a positive number"),
}).noUnknown(true, "Unknown fields are not allowed");

function validation(schema) {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            res.status(400).json({ errors: error.errors });
        }
    };
}

module.exports = {
    validation,
    userValidationSchema,
    projectValidationSchema,
    taskValidationSchema,
    commentValidationSchema
}
