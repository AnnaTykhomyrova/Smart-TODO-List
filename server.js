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
const request     = require( 'request' );
const qs          = require('querystring');

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
  if (req.session.user_id) {
    let templateVars = {
      username: req.session.username
    };
     return res.render("home_page", templateVars);
  }
  res.redirect('/login');
});

// When user click button logout
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

// When user click button update
app.get('/update', (req, res) => {
  if(req.session.user_id){
    let username = req.session.username;
    let password = req.session.password;
    let templateVars = {
      username: username,
      password: password
    };
  res.render("update_page", templateVars);
  } else {
    res.redirect("/login")
  }
});


// app.post('/add-item', (req, res) => {
//   res.redirect('/');
// });
//for api call
// Json word notation

// Restraunts & cafes = RetailLocation;
// products = ConsumerProductsPTE;
// books = Book;
// movie = Movie;


app.get("/register", (req, res) => {
  res.render("registration_page");
});

app.post ("/register", (req, res)  => {
  knex('users')
    .select('username')
    .where('username', req.body.username)
    .then((response)=>{
      if (response.length > 0){
        throw new Error('User with this name already exists');
      } else {
        return knex('users')
        .insert({username: req.body.username, password: req.body.password})
        .then(() => knex('users').select().where('username', req.body.username))
        .then((response) => {
          req.session.user_id = response[0].id;
          req.session.username = response[0].username;
          res.redirect("/");
        }).catch((err) => {
      res.render('registration_page', {error: err.message})
    })
  }
}).catch((err) => {
  res.render('registration_page', {error: err.message})
});
});

app.get("/login", (req, res) => {
  res.render("login_page");
});

app.post("/login", (req, res) => {
  knex('users')
    .select()
    .where('username', req.body.username)
    .then((response) => {
    if(req.body.username.length > 0){
      if (response.length === 0){
        throw new Error('User doesn\'t exist');
      }
      else if (response[0].password !== req.body.password){
        throw new Error('Invalid username or password');
      }
      else if (response[0].password === req.body.password){
      req.session.user_id = response[0].id;
      req.session.username = response[0].username;
      res.redirect("/");
      }
    } else {
      throw new Error('Enter your username')
    }
    }).catch((err) => {
      res.render('login_page', {error: err.message})
});
});

app.post('/update/save', (req, res) => {
  const newUsername = req.body['username-update'];
  knex('users')
    .where('id', req.session.user_id)
    .update({
      username: newUsername
    })
    .then(() => {
      req.session.username = newUsername;
      res.redirect('/update');
    });
});

app.post('/update/password', (req, res) => {
  const newPassword = req.body['password-update'];
  knex('users')
    .where('id', req.session.user_id)
    .update({
      password: newPassword
    })
    .then(() => {
      req.session.password = newPassword;
      res.redirect('/update');
    });
});

let apiCategory;

app.post("/add-item", (req, res) => {
  let templateVars = {
    username: req.session.username  
  };

  let searchbarText = req.body.input;

  const query = qs.stringify({ appid: 'X57U54-RPHVX5VRH3', input: `${searchbarText}`, output: 'json' })
  // api.wolframalpha.com/v2/query?appid=X57U54-RPHVX5VRH3&input=harry%20potter&output=json

  const apiUrl = `api.wolframalpha.com/v2/query?${query}`

  request( `https://api.wolframalpha.com/v2/query?${query}` , function (error, response, body) {
      if (error) {
          console.log("error occured", error);
      }
      else if (response.statusCode === 200) {
          //get (body);
          var data = JSON.parse (body); 
          let print = data.queryresult.datatypes;
          let splitPrint =  print.split(",");
          // console.log(splitPrint)

          if (splitPrint.includes('Book')) {
            apiCategory = 'books';
            return knex('list_items')
            .insert({user_description: req.body.input, api_response: 'books', category_id: '1'})
            .then(()=>{
              console.log('inserted into: books')
            }).catch((err)=>{
              if (err) throw error;
            })
          }
          else if (splitPrint.includes('Movie') || splitPrint.includes('TelevisionProgram')) {
            apiCategory = 'films';
            return knex('list_items')
            .insert({user_description: req.body.input, api_response: 'films', category_id: '2'})
            .then(()=>{
              console.log('inserted into: films')
            }).catch((err)=>{
              if (err) throw error;
            })
          }
          else if (splitPrint.includes('ConsumerProductsPTE')) {
            apiCategory = 'products';
            return knex('list_items')
            .insert({user_description: req.body.input, api_response: 'products', category_id: '3'})
            .then(()=>{
              console.log('inserted into: products')
            }).catch((err)=>{
              if (err) throw error;
            })
          }
          else if (splitPrint.includes('RetailLocation')) {
            apiCategory = 'restaurants';
            return knex('list_items')
            .insert({user_description: req.body.input, api_response: 'restaurants', category_id: '4'})
            .then(()=>{
              console.log('inserted into: restaurants')
            }).catch((err)=>{
              if (err) throw error;
            })
          }
          else {
            return knex('list_items')
            .insert({user_description: req.body.input, api_response: 'other', category_id: '5'})
            .then(()=>{
              console.log(apiCategory);
              console.log('inserted into: other')
            }).catch((err)=>{
              if (err) throw error;
            });
          }
        }
        res.render('home_page', templateVars);
    });
  })

  app.get("/get-items", (req, res) => {
    if (req.session.id !== undefined && req.session.id !== null) {
      knex
        .select('list_items.id', 'list_items.api_response', 'list_items.category_id', 'list_items.list_id')
        .from('list_items')
        .innerJoin('users', 'items.user_id', 'users.id')
        .where('user_id', req.session.id)
        .then(results => {
          res.json(results);
        });
    }
});
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


