const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");


const booksController = require("../controllers/books");

router.post('/add-book',Verify.verifyUser, booksController.addBook);
router.get('/books-for-user', Verify.verifyUser, booksController.getBooksToUser);
router.get('/books-for-admin', Verify.verifyUser, booksController.getBooksToAdmin);

// router.post('/course-request', Verify.verifyUser, coursesController.addCourseRequest);


module.exports = router