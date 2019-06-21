"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// User home page
app.get("/", (req, res) => {
  var username;
   knex.select('username').table('user')
   .then(response => {
     username = response;
   });
  let templateVars = {
    username: username
  };
  res.render("home_page", templateVars);
});

// When user click button logout
app.post('/logout', (req, res) => {
  res.redirect('/login');
});

// When user click button update
app.post('/update', (req, res) => {
  res.render("update_page");
});

app.get("/update", (req, res) => {
  res.render("update_page");
});

app.get("/login", (req, res) => {
  res.render("login_page");
});


app.post("/login", (req, res) => {
  res.redirect("/");
});


app.get("/register", (req, res) => {
  res.render("registration_page")
});

app.post ("/register", (req, res)  => {
  res.redirect("/")
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});