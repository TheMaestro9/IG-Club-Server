const models = require("../models");
const Activity = models.Activity
const User = models.User
const Op = models.Sequelize.Op
const tokenDecoded = require("./tokenDecoded")

exports.addActivity = function (req, res, next) {
    let ActivityBody = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        imageUrl: req.body.imageUrl
    }

    Activity.create(ActivityBody)
    .then( (newActivity, created) => {
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

exports.getActivities = function (req, res, next) {
    const userId = tokenDecoded(req).id
    const type = req.query.type
    Activity.findAll({
        where: {"type": type}
        // include: [{
        //     model: Interests,
        //     through: {
        //         attributes: [UserId],
        //         where: {UserId: userId}
        //     }
        // }]
    })
    .then(activeties => {
        return res.status(200).json({
            status: true,
            "activeties": activeties
        })
    })
    .catch()
}

exports.editActivity = function (req, res, next) {
    var activityId = req.params.activityId

    let ActivityBody = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        imageUrl: req.body.imageUrl
    }

    Activity.findById(activityId)
    .then( activity => {
        activity.update(ActivityBody)
        .then(success => {
            return res.status(200)
            .json({
                success: true,
                message: "The activity successfuly updated."
            })
        })
       })
    .catch( error => {
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
    .then( activity => {
        activity.destroy({force: true})
        .then(success => {
            return res.status(200)
            .json({
                success: true,
                message: "The activity successfuly deleted."
            })
        })
       })
    .catch( error => {
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
        .then( user => {
            activity.setUsers([user])
            .then( _ => {
            return res.status(200)
            .json({
                success: true
            })
            })
        })
    })
    .catch( error => {
        return res.status(500)
        json({
            success: false,
            message: "This activity does not exist."
        })
    })
}

exports.getInterest = function(req, res, next) {
    let userId = tokenDecoded(req).id
    Activity.findAll()
    .then( activeties => {
        activeties.getUsers({
            where: {"UserId": userId}
        }).then(activeties => {
            return res.status(200)
            .json({
                success: true,
                "activeties": activeties
            })
        })
        .catch( error => {
        return res.status(500)
        .json({
            success: false,
            message: "You have any interested activity"
        })
        })
    })
    .catch()
}