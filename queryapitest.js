const request = require( 'request' );
const qs = require('querystring');


app.post("/add-item", (req, res) => {

  let searchbarText = req.body.searchbar;

  const query = qs.stringify({ appid: 'X57U54-RPHVX5VRH3', input: `${searchbarText}`, output: 'json' })
  // api.wolframalpha.com/v2/query?appid=X57U54-RPHVX5VRH3&input=harry%20potter&output=json

  const apiUrl = `api.wolframalpha.com/v2/query?${query}`
  
  request( `api.wolframalpha.com/v2/query?${query}` , function (error, response, body) {
      if (error) {
          console.log("error occured", error);
      }
      else if (response.statusCode === 201) {
          //get (body);
          var data = JSON.parse (body); 
          let print = data.queryresult.datatypes;
          let splitPrint =  print.split(",");
          for (var i = 0; i < splitPrint.length; i++) {
          if (splitPrint[i] === 'Book') {
            console.log('found Books')
          }
          else if (splitPrint[i] === 'TelevisionProgram') {
            console.log('found show')
          }

          else if (splitPrint[i] === 'Movie') {
            console.log('found Movie')
          }
          else if (splitPrint[i] === 'ConsumerProductsPTE') {
            console.log('found product')
          }
          else if (splitPrint[i] === 'RetailLocation') {
            console.log('found restraunt or cafe')
          }
          else {
            console.log('found others')
          }
          //Do something
          }
      }
      
  }

  );
  
  res.redirect('/');
});









// console.log(splitPrint);

// Json word notation

// Restraunts & cafes = RetailLocation;
// products = ConsumerProductsPTE;
// books = Book;
// movie = Movie;