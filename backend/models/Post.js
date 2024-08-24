const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    postedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: Date.now
    },
    author: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    comments: [{
        username: {
            type: String,
        },
        comment: {
            type: String,
        }
    }]
})

module.exports = mongoose.model("Post", PostSchema);