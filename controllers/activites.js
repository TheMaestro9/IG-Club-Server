const models = require("../models");
const Activity = models.Activity
const Interests = models.Interests
const User = models.User
const Op = models.Sequelize.Op
const tokenDecoded = require("./tokenDecoded")
const db = require("../db")

exports.addActivity = function (req, res, next) {
    let ActivityBody = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        imageUrl: req.body.imageUrl
    }

    Activity.create(ActivityBody)
        .then((newActivity, created) => {
            if (!newActivity) {
                return res.status(500).json({
                    success: false,
                    message: "Error while creating the activety."
                })
            }

            return res.status(200).json({
                success: true,
                message: "the activety has been created."
            })
        }).catch(error => {
            return res.status(500).json({
                success: false,
                message: "error"
            })
        })
}

// exports.getActivities = function (req, res, next) {
//     const userId = tokenDecoded(req).id
//     const type = req.query.type
//     Activity.findAll({
//         where: { "type": type }
//         // include: [{
//         //     model: Interests,
//         //     through: {
//         //         attributes: [UserId],
//         //         where: {UserId: userId}
//         //     }
//         // }]
//     })
//         .then(activeties => {
//             return res.status(200).json({
//                 status: true,
//                 "activeties": activeties
//             })
//         })
//         .catch()
// }

exports.editActivity = function (req, res, next) {
    var activityId = req.params.activityId

    let ActivityBody = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        imageUrl: req.body.imageUrl
    }

    Activity.findById(activityId)
        .then(activity => {
            activity.update(ActivityBody)
                .then(success => {
                    return res.status(200)
                        .json({
                            success: true,
                            message: "The activity successfuly updated."
                        })
                })
        })
        .catch(error => {
            return res.status(500)
            json({
                success: false,
                message: "This activity does not exist."
            })
        })
}

exports.deleteActivity = function (req, res, next) {
    let activityId = req.params.activityId
    Activity.findById(activityId)
        .then(activity => {
            activity.destroy({ force: true })
                .then(success => {
                    return res.status(200)
                        .json({
                            success: true,
                            message: "The activity successfuly deleted."
                        })
                })
        })
        .catch(error => {
            return res.status(500)
            json({
                success: false,
                message: "This activity does not exist."
            })
        })
}

exports.interestActivity = function (req, res, next) {
    let userId = tokenDecoded(req).id
    let activityId = req.params.activityId
    let interest = req.body.interest
    Activity.findById(activityId)
        .then(activity => {
            User.findById(userId)
                .then(user => {
                    activity.addUsers([user])
                        .then(_ => {
                            return res.status(200)
                                .json({
                                    success: true
                                })
                        })
                })
        })
        .catch(error => {
            return res.status(500)
            json({
                success: false,
                message: "This activity does not exist."
            })
        })
}

exports.removeInterest = function (req, res, next) {
    let userId = tokenDecoded(req).id
    let activityId = req.params.activityId
    Activity.findById(activityId)
        .then(activity => {
            User.findById(userId)
                .then(user => {
                    activity.removeUsers([user])
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
                message: "This activity does not exist."
            })
        })
}

exports.removeInterestByAdmin = function (req, res, next) {
    let userId = req.params.userId 
    let activityId = req.params.activityId
    Activity.findById(activityId)
        .then(activity => {
            User.findById(userId)
                .then(user => {
                    activity.removeUsers([user])
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
                message: "This activity does not exist."
            })
        })
}


AddInterestedField = function (userActiveties, activities) {

    for (var j = 0; j < activities.length; j++) {
        console.log("oh my")
        activity = activities[j]['dataValues'];
        activity['interested'] = false;
        for (var i = 0; i < userActiveties.length; i++) {
            userActivity = userActiveties[i]['dataValues'];
            if (activity.id == userActivity.id) {
                console.log('deep')
                activity.interested = true;
                break;

            }
        }
    }
    console.log(activities)
    return activities
}

exports.getActivities = function (req, res, next) {
    let userId = tokenDecoded(req).id;
    const type = req.query.type;
    User.findById(userId)
        .then(user => {
            user.getActivities({ attributes: ["id"] })
                .then(userActiveties => {
                    Activity.findAll({
                        where: { "type": type }
                    })
                        .then(activeties => {

                            activeties = AddInterestedField(userActiveties, activeties)
                            return res.status(200)
                                .json({
                                    success: true,
                                    "activeties": activeties
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

exports.getUserInterests = function (req, res, next) {
    // Interests.findAll()
    //     .then(userInterests => {
    //         return res.status(200).json({
    //             success: true,
    //             userInterests: userInterests
    //         })
    //     })
    var qString = "select date_format(i.updatedAt , '%a %d %b %Y') as requestDate, username , mobile "+
                  " , email , UserId , ActivityId as RelatedTableId , a.title , a.type  from Interests i, Users u , Activities a "+
                    " where u.id = i.UserId and i.ActivityId = a.id" ; 
    db.query( qString, function (err, userInterests) {
        if (err) {
            console.log(err)
            res.send({ success: false })
        }
        else {
            return res.status(200).json({
                success: true,
                moreDetails:false, 
                userInterests: userInterests
            }) 
        }
    })

}

