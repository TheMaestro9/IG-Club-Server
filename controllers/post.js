const models = require("../models");
const Post = models.HomePost

var response = function (res, statusCode, statusMsg, msg) {
    return res.status(statusCode)
        .json({
            success: statusMsg,
            message: msg
        })
}

var dbFail = msg => response(500, false, msg)

var dbSuccess = msg => response(200, true, msg)

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
    .then( posts => {
            return res.status(200).json({
                success: true,
                posts: posts
            })
        })
    .catch( error => dbFail("Faild to get posts.") )
}

exports.createPost = (req, res, next) => {
    var postBody = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.url || null
    }
    Post.create(postBody)
    .then( (newPost, created) => {
        if (!newPost) {
            return res.status(500)
            .json({
                success: false,
                error: "Faild to store the post."
            });
        }

        return res.status(200).json({
            success: true,
            message: "The post successfuly stored"
        });
    });
 }

 exports.editPost = (req, res, next) => {
    var postBody = {
        title: req.body.title,
        content: req.body.content,
        url: req.body.url || null
    }

     let postId = req.params.postId
     Post.findById(postId)
     .then( post => {
        post.update(postBody)
        .then(success => {
            return res.status(200)
            .json({
                success: true,
                message: "The post successfuly updated."
            })
        })
        .catch( _ => {
            return res.status(500)
        .json({
            success: false,
            message: "Can not update the post."
        })
        })
    })
    .catch(error => {
        return res.status(500)
        .json({
            success: false,
            message: "This Post does not exist."
        })
    })
 }

 exports.deletePost = (req, res, next) => {
    var postId = req.params.postId
    Post.findById(postId)
    .then( post => {
        post.destroy({force: true})
        .then(success => {
            return res.status(200)
            .json({
                success: true,
                message: "The post successfuly deleted."
            })
        })
       })
    .catch( error => {
        return res.status(500)
        json({
            success: false,
            message: "This Post does not exist."
        })
    } )
 }