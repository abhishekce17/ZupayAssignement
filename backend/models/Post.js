const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    firstImgLink: {
        type: String
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

PostSchema.index({ title: "text" });

module.exports = mongoose.model("Post", PostSchema);