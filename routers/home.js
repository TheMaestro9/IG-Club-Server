const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");

let validateSchema = require('../json-schemaes/validateSchema')
let postSchema = require("../json-schemaes/postSchema")

const postController = require("../controllers/post");

router.get('/posts', Verify.verifyUser, postController.getAllPosts);
router.post('/posts',validateSchema(postSchema), Verify.verifyUser, postController.createPost);

router.put('/posts/:postId', validateSchema(postSchema), Verify.verifyUser, postController.editPost);
router.delete('/posts/:postId', Verify.verifyUser, postController.deletePost);

module.exports = router