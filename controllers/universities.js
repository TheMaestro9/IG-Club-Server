const models = require("../models");
const Universities = models.Universities

var response = function (res, statusCode, statusMsg, msg) {
    return res.status(statusCode)
        .json({
            success: statusMsg,
            message: msg
        })
}

var dbFail = msg => response(500, false, msg)

var dbSuccess = msg => response(200, true, msg)

exports.getAllUniversities = (req, res, next) => {
    Universities.findAll()
    .then( universities => {
            return res.status(200).json({
                success: true,
                universities: universities
            })
        })
    .catch( error => dbFail("Faild to get universities.") )
}

exports.createUniversity = (req, res, next) => {

    var imgUrl = req.body.imgUrl; 
    if(imgUrl == null || imgUrl ==""){
        imgUrl = "https://www.ura-hq.org/wp-content/uploads/2016/05/xURA_HOMEPAGE_IMAGE8.jpg.pagespeed.ic.f2xMPH5QGx.jpg"
    }    
    var universityBody = {
        description: req.body.description, 
        name:req.body.name, 
        imgUrl: imgUrl
    }
    Universities.create(universityBody)
    .then( (newUniversity, created) => {
        if (!newUniversity) {
            return res.status(500)
            .json({
                success: false,
                error: "Faild to store the University."
            });
        }

        return res.status(200).json({
            success: true,
            message: "The University successfuly stored"
        });
    });
 }

 exports.editUniversity = (req, res, next) => {
    var universityBody = {
        description: req.body.description, 
        name:req.body.name, 
        imgUrl: req.body.imgUrl
    }
     let universityId = req.body.id
     Universities.findById(universityId)
     .then( university => {
        university.update(universityBody)
        .then(success => {
            return res.status(200)
            .json({
                success: true,
                message: "The university successfuly updated."
            })
        })
        .catch( _ => {
            return res.status(500)
        .json({
            success: false,
            message: "Can not update the university."
        })
        })
    })
    .catch(error => {
        return res.status(500)
        .json({
            success: false,
            message: "This University does not exist."
        })
    })
 }

 exports.deleteUniversity = (req, res, next) => {
    var universityId = req.params.universityId
    Universities.findById(universityId)
    .then( university => {
        university.destroy({force: true})
        .then(success => {
            return res.status(200)
            .json({
                success: true,
                message: "The university successfuly deleted."
            })
        })
       })
    .catch( error => {
        return res.status(500)
        json({
            success: false,
            message: "This university does not exist."
        })
    } )
 }

