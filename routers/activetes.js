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
// router.get("/interest", controllers.getInterest)
router.post("/:activityId/interest", validateSchema(interestSchema), controllers.interestActivity)

// Only Admis can add, edit or remove posts
router.use(checkAdmin)

router.post("/", validateSchema(schema), controllers.addActivity)
router.put("/:activityId", validateSchema(schema), controllers.editActivity)
router.delete("/:activityId", controllers.deleteActivity)

module.exports = router