const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("./login.controller");
const error = require("./errors");

router.post("/", controller.post);

router.all("/", error.notPost);

module.exports = router;
