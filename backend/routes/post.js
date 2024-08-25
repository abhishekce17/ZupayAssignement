require("dotenv").config();
const express = require("express");
const router = express.Router()
const { postSchema, updatedPostSchema, commentSchema } = require("../Schema");
const Post = require("../models/Post");
const User = require("../models/User");
const { loginStatus, postOwnership } = require("../middleware/middleware");


router.get("/", async (req, res) => {
    try {
        const allPost = await Post.find({}, { firstImgLink: 1, title: 1, postedAt: 1, _id: 1 });
        return res.status(200).json(allPost);
    } catch (error) {
        return res.status(500).json(error);
    }
})
    .get("/search", async (req, res) => {
        try {
            const title = req.query.title;
            const post = await Post.find({ $text: { $search: title } });
            if (post.length > 0) {
                return res.status(200).json(post);
            }
            return res.status(404).json("No post found");
        } catch (error) {
            return res.status(500).json(error);
        }
    })
    .get("/author/:authorId", async (req, res) => {
        try {
            const authorId = req.params.authorId;
            const post = await Post.find({ authorId: authorId });
            if (post.length > 0) {
                return res.status(200).json(post);
            }
            return res.status(404).json("No post found");
        } catch (error) {
            console.log(error);
            return res.status(500).json("No post found");
        }
    })
    .get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findById(id);
            if (post) {
                return res.status(200).json(post);
            }
            return res.status(404).json("No post found");
        } catch (error) {
            return res.status(500).json("No post found");
        }
    })
    .post("/author", async (req, res) => {
        try {
            const post = await Post.find({ authorId: { $in: [...req.body] } });
            if (post.length > 0) {
                return res.status(200).json(post);
            }
            return res.status(404).json("No post found");
        } catch (error) {
            console.log(error);
            return res.status(500).json("No post found");
        }
    })
    .post("/", loginStatus, async (req, res) => {
        try {
            const { success, error } = postSchema.safeParse(req.body);
            if (!success) {
                console.log(error);
                return res.status(400).json("Not a valid Post");
            }
            const newPost = await Post.create({ ...req.body });
            await User.findByIdAndUpdate(req.userId, { $push: { posts: newPost.id } });
            return res.status(200).end().end();
        } catch (error) {
            console.log(error);
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
            return res.status(200).end();
        } catch (error) {
            console.log(error);
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
            await User.findByIdAndUpdate(req.userId, { $pull: { posts: req.params.id } });
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json(error);
        }
    }).post("/add-comment/:id", loginStatus, async (req, res) => {
        const { success, error } = commentSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json(error);
        }
        try {
            const comment = await Post.findByIdAndUpdate(req.params.id, { $push: { comments: { ...req.body } } });
            return res.status(200).json({ id: comment.id });
        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    });

module.exports = router;