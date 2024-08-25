const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 20,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    posts: [mongoose.SchemaTypes.ObjectId],
    following: [{
        authorId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            unique: true
        },
        username: {
            type: String,
            unique: true
        }
    }]
});

module.exports = mongoose.model("User", UserSchema);