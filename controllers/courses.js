const models = require("../models");
const EslCourse = models.EslCourse

var response = function (res, statusCode, statusMsg, msg) {
    return res.status(statusCode)
        .json({
            success: statusMsg,
            message: msg
        })
}

var dbFail = msg => response(500, false, msg)

var dbSuccess = msg => response(200, true, msg)

exports.getEsl = (req, res, next) => {
    EslCourse.findAll()
    .then( courseData => {
            return res.status(200).json({
                success: true,
                courseData: courseData[0]
            })
        })
    .catch( error => dbFail("Faild to get posts.") )
}

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

