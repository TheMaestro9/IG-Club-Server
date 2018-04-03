const express = require("express");
const router = express.Router();


const controller = require("./signup.controller");

router.post("/", controller.post);

router.all("/", controller.notPost);

module.exports = router;
