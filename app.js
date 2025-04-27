const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const captchaController = require("./controllers/captcha");
const fs = require("fs");
const authRoute = require("./routes/auth")
const articlesRoute = require("./routes/articles")

const localStrategy = require("./strategies/localStrategy")

const app  = express();

// Set cors
app.use(cors());
// Get req.body
app.use(express.json());
app.use(express.urlencoded({extended : true}));

passport.use(localStrategy); 
app.use(passport.initialize());

// Routes
app.get("/captcha" , captchaController.get)
app.use("/auth" , authRoute)
app.use("/articles" , articlesRoute)

module.exports = app