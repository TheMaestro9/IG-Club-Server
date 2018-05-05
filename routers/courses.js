const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");
const checkAdmin = require('../controllers/checkAdmin')


const coursesController = require("../controllers/courses");


router.get('/course-info', Verify.verifyUser, coursesController.getCourseInfo);

router.use(checkAdmin)
router.put('/edit-course', Verify.verifyUser, coursesController.editCourse);
router.post('/course-request', Verify.verifyUser, coursesController.addCourseRequest);


module.exports = router