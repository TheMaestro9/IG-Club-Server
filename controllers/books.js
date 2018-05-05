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

exports.addBook = (req, res, next) => {
    var book = {
        bookTitle: req.body.bookTitle,
        ISBN: req.body.ISBN,
        category:req.body.category,
        paymentMethod:req.body.paymentMethod, 
        bookCondition:req.body.bookCondition, 
        price: req.body.price , 
        byAdmin: req.body.byAdmin, 
        imgUrl: req.body.imgUrl || null,
        UserId: req.userId 
    }

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

// exports.addCourseRequest = (req , res , next) =>{
    

//     var requestBody = {
//         CourseId: req.body.courseId , 
//         UserId :req.userId, 
//         communicationTime: req.body.communicationTime,
//         courseArea: req.body.courseArea,
//         courseDate: req.body. courseDate
//     }
//     CourseRequests.create(requestBody)
//     .then( (newRequest, created) => {
//         if (!newRequest) {
//             return res.status(500)
//             .json({
//                 success: false,
//                 error: "Faild to store the Request."
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Your Request was submitted successfully "
//         });
//     });
// }

//  exports.editEsl = (req, res, next) => {
//     var postBody = {
//         title: req.body.title,
//         content: req.body.content,
//         url: req.body.url || null
//     }

//      let postId = req.params.postId
//      Post.findById(postId)
//      .then( post => {
//         post.update(postBody)
//         .then(success => {
//             return res.status(200)
//             .json({
//                 success: true,
//                 message: "The post successfuly updated."
//             })
//         })
//         .catch( _ => {
//             return res.status(500)
//         .json({
//             success: false,
//             message: "Can not update the post."
//         })
//         })
//     })
//     .catch(error => {
//         return res.status(500)
//         .json({
//             success: false,
//             message: "This Post does not exist."
//         })
//     })
//  }

