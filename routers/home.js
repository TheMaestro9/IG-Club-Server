const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");


const postController = require("../controllers/post");

// router.use("/posts", Verify.verifyUser);

router.get('/posts', Verify.verifyUser, postController.getAllPosts);
router.post('/posts', postController.createPost);

router.put('/posts/:postId', postController.editPost);
router.delete('/posts/:postId', postController.deletePost);

module.exports = router