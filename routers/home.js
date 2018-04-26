const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");
const checkAdmin = require('../controllers/checkAdmin')

let validateSchema = require('../json-schemaes/validateSchema')
let postSchema = require("../json-schemaes/postSchema")

const postController = require("../controllers/post");

// Only Registered users can get the posts
router.use("/posts", Verify.verifyUser);

router.get('/posts', postController.getAllPosts);

// Only Admis can add, edit or remove posts
router.use(checkAdmin)

router.post('/posts',validateSchema(postSchema), postController.createPost);
router.put('/posts/:postId',validateSchema(postSchema), postController.editPost);
router.delete('/posts/:postId', postController.deletePost);


module.exports = router