const express = require("express");
const router = express.Router();
const Verify = require("../auth/verify");
const checkAdmin = require('../controllers/checkAdmin')


const booksController = require("../controllers/books");

router.use(Verify.verifyUser)
router.get('/books-for-user', booksController.getBooksToUser);
router.post('/add-book', booksController.addBook);
router.post("/:bookId/request",  booksController.requestBook)
router.delete("/remove-request/:bookId",  booksController.removeBookRequest)


router.use(checkAdmin)
router.get('/books-for-admin', booksController.getBooksToAdmin);
router.put('/edit-book' , booksController.editBook);
router.get('/book-requests', booksController.getBookRequests);
 


module.exports = router