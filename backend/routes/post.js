require("dotenv").config();
const express = require("express");
const router = express.Router()
const { postSchema, updatedPostSchema, commentSchema } = require("../Schema");
const Post = require("../models/Post");
const User = require("../models/User");
const { loginStatus, postOwnership } = require("../middleware/middleware");


router.get("/", async (req, res) => {
    try {
        const allPost = await Post.find({});
        return res.status(200).json(allPost);
    } catch (error) {
        return res.status(500).json(error);
    }
})
    .get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findById(id);
            if (post) {
                return res.status(200).json(post);
            }
            return res.status(404).json({ error: "No post found" });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
    .get("/search", async (req, res) => {
        try {
            const title = req.query.title;
            const post = await Post.find({ title: title });
            if (post) {
                return res.status(200).json(post);
            }
            return res.status(404).json({ error: "No post found" });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
    .post("/", loginStatus, async (req, res) => {
        try {
            const { success, error } = postSchema.safeParse(req.body);
            if (!success) {
                return res.status(400).json(error);
            }
            const newPost = await Post.create(req.body);
            await User.findByIdAndUpdate(req.userId, { $push: { posts: newPost.id } });
            return res.status(200);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
    .put("/:id", loginStatus, postOwnership, async (req, res) => { //middleware for user authenticaion
        try {
            const { success, error } = updatedPostSchema.safeParse(req.body);
            if (!success) {
                return res.status(400).json(error);
            }
            await Post.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
            return res.status(200);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
    .delete("/:id", loginStatus, postOwnership, async (req, res) => {
        try {
            const { success, error } = updatedPostSchema.safeParse(req.body);
            if (!success) {
                return res.status(400).json(error);
            }
            await Post.findByIdAndDelete(req.params.id);
            return res.status(200);
        } catch (error) {
            return res.status(500).json(error);
        }
    }).post("/add-comment/:id", loginStatus, async (req, res) => {
        const { success, error } = commentSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json(error);
        }
        try {
            await Post.findByIdAndUpdate(req.params.id, { $push: { comments: { ...req.body } } });
            return res.status(200);
        } catch (error) {
            return res.status(500).json(error);
        }
    });

module.exports = router;