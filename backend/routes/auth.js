require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router()
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require("../Schema");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET
const saltRounds = 10;

router.post("/register", (req, res) => {
    try {
        const { success, error } = registerSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json(error);
        }
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const user = await User.create({ ...req.body, password: hash });
            const authToken = jwt.sign(user.id, JWT_SECRET);
            return res.status(200).json(authToken);
        });
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const { success, error } = loginSchema.safeParse(req.body)
        if (!success) {
            return res.status(401).json(error);
        }
        const user = await User.findOne({ email: req.body.email }, function (err, findUser) {
            if (err || !findUser) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            if (findUser) {
                bcrypt.compare(req.body.password, findUser.password, function (err, result) {
                    if (!result) {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                    const authToken = jwt.sign(findUser.id, JWT_SECRET);
                    return res.status(200).json(authToken);
                });
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}
)

module.exports = router;