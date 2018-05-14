const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");
const checkAdmin = require('../controllers/checkAdmin')
const controllers = require('../controllers/activites')

const validateSchema = require('../json-schemaes/validateSchema')
const schema = require('../json-schemaes/activetesSchema')
const interestSchema = require('../json-schemaes/interestActivitySchema')

// Only Registered users can get the posts
router.use(Verify.verifyUser);

router.get("/", controllers.getActivities)
router.post("/:activityId/interest",  controllers.interestActivity)
router.delete("/remove-interest/:activityId",  controllers.removeInterest)


// Only Admis can add, edit or remove posts
router.use(checkAdmin)

router.post("/", controllers.addActivity)
router.put("/:activityId", controllers.editActivity)
router.delete("/:activityId", controllers.deleteActivity)
router.delete("/remove-interest/:activityId/:userId", controllers.removeInterestByAdmin)
router.get("/user-interests", controllers.getUserInterests)


module.exports = router