const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");
const checkAdmin = require('../controllers/checkAdmin')


const booksController = require("../controllers/books");

router.use(Verify.verifyUser)
router.get('/books-for-user', booksController.getBooksToUser);
router.get('/book-requests', booksController.getBookRequests);


router.use(checkAdmin)
router.get('/books-for-admin', booksController.getBooksToAdmin);
router.post('/add-book', booksController.addBook);
router.put('/edit-book' , booksController.editBook); 


module.exports = router