const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.User




exports.checkToken = (req, res) => {
    var token = req.query.token;
    var payload = jwt.decode(token);
    console.log('oh man ')
    console.log(payload)
    var exp = payload.exp;
    var expDate = new Date(exp * 1000);
    var currentDate = new Date();
    expDate.setDate(expDate.getDate() - 1)
    if (expDate < currentDate)
        res.send({ success: false })
    else
        res.send({ success: true })
}


exports.getUserInfo =(req,res)=>{

    console.log("IN NORMAL GET USER INFO")
    var token = req.query.token; 
    var payload = jwt.decode(token);
    var userId = payload.id ; 

    User.findById(userId)
    .then( user => {
        return res.status(200)
       .json({
           success: true,
           userInfo: user
       });
   
   })
   .catch(error => {
       return res.status(500)
       .json({
           success: false,
           message: "This User does not exist."
       })
   })

}