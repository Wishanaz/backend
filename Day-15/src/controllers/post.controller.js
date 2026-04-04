const postModel = require("../models/post.model")

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/*
 * creating post 
 */
// async function createPostController(req, res) {

// }
