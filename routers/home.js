const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");


const postController = require("../controllers/post");

router.get('/posts', Verify.verifyUser, postController.getAllPosts);
router.post('/posts', Verify.verifyUser, postController.createPost);

router.put('/posts/:postId', Verify.verifyUser, postController.editPost);
router.delete('/posts/:postId', Verify.verifyUser, postController.deletePost);

module.exports = router