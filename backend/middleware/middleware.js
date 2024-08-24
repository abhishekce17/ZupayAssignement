const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const loginStatus = (req, res, next) => {
    const tokenWithBearer = req.header("Authorization");
    if (!tokenWithBearer) {
        return res.status(401).send({ error: "Session Expired" })
    }
    try {
        const token = tokenWithBearer.split("Bearer")[1].trim();
        const decryptToken = jwt.verify(token, JWT_SECRET)
        req.userId = decryptToken;
        next()
    } catch (error) {
        return res.status(401).send({ error: "Session Expired" });
    }
}

const postOwnership = async (req, res, next) => {
    try {
        const postArray = await User.findById(req.userId);
        const result = postArray.posts.includes(req.params.id);
        if (!result) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = { loginStatus, postOwnership };
