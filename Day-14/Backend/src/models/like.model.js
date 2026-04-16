const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post id is required to like a post"]
    },
    user: {
        type: String,
        required: [true, "Username is required to like a post"]
    }
}, {timestamps: true})

// create a unique index so that same user can like same post only once
likeSchema.index({post:1, user:1}, {unique:true})

// likeModel
const likeModel = mongoose.model("likes", likeSchema)

//export
module.exports = likeModel