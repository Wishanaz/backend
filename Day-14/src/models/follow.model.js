const express = require("express")

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true, " Follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true, "Followee is required"]
    }
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel