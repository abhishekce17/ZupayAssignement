require("dotenv").config();
const express = require("express");
const { userUpdateSchema } = require("../Schema");
const User = require("../models/User");
const { loginStatus } = require("../middleware/middleware");
const router = express.Router()

router.use(loginStatus);
router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        console.log(req.userId);
        if (!user) {
            return res.status(401).json({ error: { message: "Unauthorized" } });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
})
    .put("/", async (req, res) => {
        try {
            const { success, error } = userUpdateSchema.safeParse(req.body);
            if (!success) {
                return res.status(400).json(error);
            }
            await User.findByIdAndUpdate(req.userId, { $set: { ...req.body } });
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json(error);
        }
    }).put("/password-change", async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.userId, { $set: { password: req.body.password } });
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json(error);
        }
    }).get("/follow/:authorId", async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.userId, {
                $push: {
                    following:
                    {
                        authorId: req.params.authorId,
                        username: req.query.username
                    }
                }
            });
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json(error);
        }
    })

module.exports = router;