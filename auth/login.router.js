const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("./login.controller");
const error = require("./errors");

let validateSchema = require('../json-schemaes/validateSchema')
let loginSchema = require("../json-schemaes/loginSchema")

router.post("/", validateSchema(loginSchema), controller.post);

router.all("/", error.notPost);

module.exports = router;
