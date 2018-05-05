const models = require("../models");
const Courses = models.Courses
const CourseRequests = models.CourseRequests
var response = function (res, statusCode, statusMsg, msg) {
    return res.status(statusCode)
        .json({
            success: statusMsg,
            message: msg
        })
}

var dbFail = msg => response(500, false, msg)

var dbSuccess = msg => response(200, true, msg)

exports.getCourseInfo = (req, res, next) => {
    courseName = req.query.courseName;
    console.log(courseName)
    Courses.findAll({
        where: {
            name: courseName
        }
    })
        .then(courseData => {
            return res.status(200).json({
                success: true,
                courseData: courseData[0]
            })
        })
        .catch(error => dbFail("Faild to get posts."))
}


exports.editCourse = (req, res, next) => {
    var courseBody = {
        description: req.body.description,
        currentPeriod: req.body.currentPeriod,
        nextRound: req.body.nextRound,
        cost: req.body.cost 
    }
    let courseId = req.body.id
    console.log("recived id : " , courseId)
    Courses.findById(courseId)
        .then(course => {
            course.update(courseBody)
                .then(success => {
                    return res.status(200)
                        .json({
                            success: true,
                            message: "The course successfuly updated."
                        })
                })
                .catch(_ => {
                    return res.status(500)
                        .json({
                            success: false,
                            message: "Can not update the Course."
                        })
                })
        })
        .catch(error => {
            return res.status(500)
                .json({
                    success: false,
                    message: "This Course does not exist."
                })
        })
}

exports.addCourseRequest = (req, res, next) => {


    var requestBody = {
        CourseId: req.body.courseId,
        UserId: req.userId,
        communicationTime: req.body.communicationTime,
        courseArea: req.body.courseArea,
        courseDate: req.body.courseDate
    }
    CourseRequests.create(requestBody)
        .then((newRequest, created) => {
            if (!newRequest) {
                return res.status(500)
                    .json({
                        success: false,
                        error: "Faild to store the Request."
                    });
            }

            return res.status(200).json({
                success: true,
                message: "Your Request was submitted successfully "
            });
        });
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

