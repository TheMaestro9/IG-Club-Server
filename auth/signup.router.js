const express = require("express");
const router = express.Router();


const controller = require("./signup.controller");
const error = require("./errors");

router.post("/", controller.post);

router.all("/", error.notPost);

module.exports = router;
