const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");

let validateSchema = require('../json-schemaes/validateSchema')
let postSchema = require("../json-schemaes/postSchema")

const postController = require("../controllers/post");

router.get('/posts', Verify.verifyUser, postController.getAllPosts);
router.post('/posts',Verify.verifyUser, validateSchema(postSchema), postController.createPost);

router.put('/posts/:postId', Verify.verifyUser, validateSchema(postSchema), postController.editPost);
router.delete('/posts/:postId', Verify.verifyUser, postController.deletePost);

module.exports = router