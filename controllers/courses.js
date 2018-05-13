const models = require("../models");
const Courses = models.Courses
const User = models.User
const db = require("../db")


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
    console.log("recived id : ", courseId)
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

    CourseId = req.body.courseId;
    UserId = req.userId;
    requestBody = {
        communicationTime: req.body.communicationTime,
        courseArea: req.body.courseArea,
        courseDate: req.body.courseDate
    }
    Courses.findById(CourseId)
        .then(course => {
            User.findById(UserId)
                .then(user => {
                    course.addUser(user, {
                        through: requestBody
                    })
                        .then(_ => {
                            return res.status(200)
                                .json({
                                    success: true,
                                    message: "the Request was submitted succesfully"
                                })
                        })
                }).catch(error => {
                    console.log(error); 
                    return res.status(500)
                    json({
                        success: false,
                        message: "This Course does not exist."
                    })

                })
        })
        .catch(error => {
            return res.status(500)
            json({
                success: false,
                message: "This Course does not exist."
            })
        })
}


exports.removeRequestByAdmin = function (req, res, next) {
    let userId = req.params.userId 
    let courseId = req.params.courseId
    Courses.findById(courseId)
        .then(course => {
            User.findById(userId)
                .then(user => {
                    course.removeUsers([user])
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
                message: "This course does not exist."
            })
        })
}


exports.getUserRequests = function (req, res, next) {
    
    var qString = "select date_format(r.courseDate , '%a %d %b %Y') as requestDate, username , mobile "+
                  " , email , UserId , CourseId as RelatedTableId , c.name as title , communicationTime , courseArea"+
                  "  from CourseRequests r, Users u , Courses c "+
                    " where u.id = r.UserId and r.CourseId = c.id" ; 
    db.query( qString, function (err, userInterests) {
        if (err) {
            console.log(err)
            res.send({ success: false })
        }
        else {
            return res.status(200).json({
                success: true,
                moreDetails:true, 
                userRequests: userInterests
            }) 
        }
    })

}


