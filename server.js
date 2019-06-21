"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieSession = require("cookie-session");
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
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"],
  
  maxAge: 24 * 60 * 60 * 1000
}));


// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// User home page
app.get("/", (req, res) => {
  var username;
  knex.select('username').from('users').where('id', 2)
  .then(response => {
    username = response;
    let templateVars = {
    username: username[0].username
  };
   console.log(response);
  res.render("home_page", templateVars);
  });
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
  knex('users')
    .select()
    .where('username', req.body.username)
    .then((response) => {
      if (!response){
        res.render("login_page").alert('Error: not found')
      }
      else if (response.password === req.body.passwords){
      req.session.user_id = response.id
      res.redirect("/");
      }
    })
});


app.get("/register", (req, res) => {
  res.render("registration_page")
});

app.post ("/register", (req, res)  => {
  knex('users').insert({username: req.body.username, password: req.body.password}).then(()=> console.log("inserted!"))
  .catch((err)=> {console.log(err); throw err})
  // console.log(req.body.username);
  res.redirect("/")
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

