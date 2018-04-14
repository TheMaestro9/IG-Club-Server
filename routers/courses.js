const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");


const coursesController = require("../controllers/courses");

// router.use("/posts", Verify.verifyUser);

router.get('/esl', Verify.verifyUser, coursesController.getEsl);
// router.put('/esl/', postController.editPost);

module.exports = router