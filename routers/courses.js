const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");


const coursesController = require("../controllers/courses");

// router.use("/posts", Verify.verifyUser);

router.get('/course-info', Verify.verifyUser, coursesController.getCourseInfo);
router.post('/course-request', Verify.verifyUser, coursesController.addCourseRequest);

// router.put('/esl/', postController.editPost);

module.exports = router