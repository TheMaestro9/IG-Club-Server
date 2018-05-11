const models = require("../models");
const Books = models.Books
const BookRequests = models.BookRequests ; 
const User = models.User 

var response = function (res, statusCode, statusMsg, msg) {
    return res.status(statusCode)
        .json({
            success: statusMsg,
            message: msg
        })
}

var dbFail = msg => response(500, false, msg)

var dbSuccess = msg => response(200, true, msg)

exports.getBooksToUser = (req, res, next) => {
    Books.findAll({
        where:{
            byAdmin:true  
        }
    })
    .then( books => {
            return res.status(200).json({
                success: true,
                books: books
            })
        })
    .catch( error => dbFail("Faild to get posts.") )
}


exports.getBooksToAdmin = (req, res, next) => {
    Books.findAll({
        include: [{
            attributes: ['username', 'email', 'mobile'],
            model: User,
        }],
        where: {
            byAdmin :true  
        }
    })
    .then( books => {
            return res.status(200).json({
                success: true,
                books: books
            })
        })
    .catch( error => dbFail("Faild to get posts.") )
}

exports.getBookRequests= (req , res , next)=>{ 
    BookRequests.findAll()
    .then(bookRequests=>{ 
        return res.status(200).json({
            success: true,
            bookRequests: bookRequests
        })
    })

}

exports.addBook = (req, res, next) => {

    console.log("in ADD BOOOK ")

    var imgUrl = req.body.imgUrl; 
    if(imgUrl == null || imgUrl ==""){
        imgUrl = "assets/imgs/default-book.jpg"
    }
    var book = req.body 
    book['UserId'] =  req.userId;
    book.imgUrl = imgUrl ; 

    console.log(book)
    Books.create(book)
    .then( (newBook, created) => {
        if (!newBook) {
            return res.status(500)
            .json({
                success: false,
                error: "Faild to add the book."
            });
        }

        return res.status(200).json({
            success: true,
            message: "The book successfuly added"
        });
    });
}
 exports.editBook  = (req, res, next) => {
    var newBook = req.body ; 
     let bookId = req.body.BookId
     Post.findById(BookId)
     .then( book => {
        book.update(newBook)
        .then(success => {
            return res.status(200)
            .json({
                success: true,
                message: "The book successfuly updated."
            })
        })
        .catch( _ => {
            return res.status(500)
        .json({
            success: false,
            message: "Can not update the book."
        })
        })
    })
    .catch(error => {
        return res.status(500)
        .json({
            success: false,
            message: "This book does not exist."
        })
    })
 }

