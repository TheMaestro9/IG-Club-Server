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

// exports.getBooksToUser = (req, res, next) => {
//     Books.findAll({
//         where:{
//             byAdmin:true  
//         }
//     })
//     .then( books => {
//             return res.status(200).json({
//                 success: true,
//                 books: books
//             })
//         })
//     .catch( error => dbFail("Faild to get posts.") )
// }


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

 exports.requestBook = function (req, res, next) {
    let userId = req.userId
    let bookId = req.params.bookId
    Books.findById(bookId)
        .then(book => {
            User.findById(userId)
                .then(user => {
                    book.addUsers([user])
                        .then(_ => {
                            return res.status(200)
                                .json({
                                    success: true,
                                    message:"book request was added"
                                })
                        })
                })
        })
        .catch(error => {
            return res.status(500)
            json({
                success: false,
                message: "This Book does not exist."
            })
        })
}

exports.removeBookRequest = function (req, res, next) {
    let userId = req.userId
    let bookId = req.params.bookId
    Books.findById(bookId)
        .then(book => {
            User.findById(userId)
                .then(user => {
                    book.removeUsers([user])
                        .then(_ => {
                            return res.status(200)
                                .json({
                                    success: true,
                                    message: "relation removed successfully!"
                                })
                        })
                })
        })
        .catch(error => {
            return res.status(500)
            json({
                success: false,
                message: "This Book does not exist."
            })
        })
}

exports.removeBookRequestByAdmin = function (req, res, next) {
    let userId = req.params.userId 
    let bookId = req.params.bookId
    Books.findById(bookId)
    .then(book => {
        User.findById(userId)
            .then(user => {
                book.removeUsers([user])
                    .then(_ => {
                        return res.status(200)
                            .json({
                                success: true,
                                message: "relation removed successfully!"
                            })
                    })
            })
    })
    .catch(error => {
        return res.status(500)
        json({
            success: false,
            message: "This Book does not exist."
        })
    })
}


AddRequestedField = function (userBooks, books) {

    for (var j = 0; j < books.length; j++) {
        book = books[j]['dataValues'];
        book['requested'] = false;
        for (var i = 0; i < userBooks.length; i++) {
            userBook = userBooks[i]['dataValues'];
            if (book.id == userBook.id) {
                book.requested = true;
                break;
            }
        }
    }
    return books
}

printSomeData = function ( ){ 
    for (let model of Object.keys(models)) {
        if(!models[model].name)
          continue;
    for (let assoc of Object.keys(models[model].associations)) {
        for (let accessor of Object.keys(models[model].associations[assoc].accessors)) {
          console.log(models[model].name + '.' + models[model].associations[assoc].accessors[accessor]+'()');
        }
      }
    }
}

exports.getBooksToUser = function (req, res, next) {
    printSomeData() ;
    let userId = req.userId;
    User.findById(userId)
        .then(user => {
            user.getBooks({ attributes: ["id"] })
                .then(userBooks => {
                    Books.findAll()
                        .then(books => {

                            books = AddRequestedField(userBooks, books)
                            return res.status(200)
                                .json({
                                    success: true,
                                    "books": books
                                })

                        })


                })
                .catch(error => {
                    return res.status(500)
                        .json({
                            success: false,
                            message: "You have no interested activity"
                        })
                })
        })
        .catch()
}




