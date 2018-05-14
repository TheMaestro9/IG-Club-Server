const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");
const checkAdmin = require('../controllers/checkAdmin')


const coursesController = require("../controllers/courses");

router.use(Verify.verifyUser)
router.get('/course-info', coursesController.getCourseInfo);
router.post('/course-request', coursesController.addCourseRequest);


router.use(checkAdmin)
router.get('/user-requests' ,coursesController.getUserRequests)
router.put('/edit-course', coursesController.editCourse);
router.delete('/remove-request/:courseId/:userId' , coursesController.removeRequestByAdmin)

module.exports = router