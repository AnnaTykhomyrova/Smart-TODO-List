// function renderItem (data) {
//   $("#read-container").append(`<li> ${data}</li>`)
// }

// function loadItems(callback) { //$jquery/ ajax request to load new tweets onto page and add tweets to database
//   $.ajax({
//     type: "GET",
//     url: "/get-item",
//     success: callback
//   })
// };
//  // success: loadItems.bind(null, function (response) {
        //   // const lastItem = response[response.length - 1];
//         //   renderItem(`${input}`);

// loadItems(function (response) {
//   response.forEach((item) => renderItem(item))
// });


$(document).ready(function() {
  $('#logout-button').on('submit',function (ev) {
  ev.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/logout'
      });
  });

  $('#update-button').on('submit',function (ev) {
  ev.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/update'
      });
  });
  
  $('#form').on('submit',function (ev) {
    ev.preventDefault();
    var input = $('input.search-bar').val();
    $('#form input').val('');
        $.ajax({
          method: 'POST',
          url: '/add-item',
          data: {input},
          success: function(response) {
            console.log(response);
          }
         })
     
         $.ajax({
        method: 'GET',
        url: '/get-item',
        data: JSON,
        success: function (response){
          for (let i in response){
            if (response[i].api_response === "books"){
              $("#read-container").append(`<li> ${input}</li>`)
            } 
                else if (response[i].api_response === "films"){
              $("#read-container").append(`<li> ${input}</li>`)
           } 
                else if (response[i].api_response === "restaurants"){
                  $("#read-container").append(`<li> ${input}</li>`)
               }
                else if (response[i].api_response === "products"){
              $("#read-container").append(`<li> ${input}</li>`)
               } 
               else if (response[i].api_response === "other"){
              $("#read-container").append(`<li> ${input}</li>`)
               }
              }
          }
        })
      })
    })
  // $('#form').on('submit',function (ev) {
  //   ev.preventDefault();
  //   var input = $('#form input').val();
  //   let newItem = $(`<div> ${input} </div>`)
  //   $('').preppend(newItem);
  // })

