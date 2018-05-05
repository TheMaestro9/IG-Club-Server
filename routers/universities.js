const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");
const checkAdmin = require('../controllers/checkAdmin')

const universitiesController = require("../controllers/universities");

// Only Registered users can get the posts
router.use(Verify.verifyUser);

router.get('/get-universities', universitiesController.getAllUniversities);

// Only Admis can add, edit or remove posts
 router.use(checkAdmin)

 router.post('/add-university', universitiesController.createUniversity);
 router.put('/edit-university', universitiesController.editUniversity);
 router.delete('/delete-university/:universityId', universitiesController.deleteUniversity);


module.exports = router