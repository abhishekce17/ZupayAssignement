const z = require("zod");

const registerSchema = z.object({
    "name": z.string().min(3, "Username should be at least 3 characters long"),
    "username": z.string().min(3, "Username should be at least 3 characters long"),
    "email": z.string().email("Invalid Email"),
    "password": z.string().min(6, "Password should be at least 6 characters long")
});

const loginSchema = z.object({
    "email": z.string().email("Invalid Email"),
    "password": z.string()
});

const postSchema = z.object({
    content: z.string().min(1),
    title: z.string().min(1),
    postedAt: z.number(),
    author: z.string(),
    authorId: z.string(),
    firstImgLink: z.string().optional()
});

const updatedPostSchema = z.object({
    content: z.string().optional(),
    title: z.string().optional(),
});

const userUpdateSchema = z.object({
    "name": z.string().min(3, "Name should be at least 3 characters long").optional(),
    "username": z.string().min(3, "Username should be at least 3 characters long").optional(),
    "email": z.string().email("Invalid Email").optional()
});

const commentSchema = z.object({
    "username": z.string(),
    "comment": z.string()
});

module.exports = { registerSchema, loginSchema, postSchema, updatedPostSchema, userUpdateSchema, commentSchema };