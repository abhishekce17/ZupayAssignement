require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router()
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require("../Schema");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET
const saltRounds = 10;

router.post("/register", async (req, res) => {
    try {
        const { success, error } = registerSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json(error);
        }
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.create({ ...req.body, password: hash });
        const authToken = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
        return res.status(200).json(authToken);
    } catch (error) {
        if (error.code === 11000) error = { error: { message: "Email already registered" } };
        return res.status(500).json(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const { success, error } = loginSchema.safeParse(req.body)
        if (!success) {
            return res.status(400).json(error);
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Invalid Credentials");
        }

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (!result) {
                return res.status(401).json("Invalid Credentials");
            }
            const authToken = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
            return res.status(200).json(authToken);
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}
)

module.exports = router;