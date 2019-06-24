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
  var input;
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
      input = $('input.search-bar').val();
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
           input = $('#form input.search-bar').val();
          for (let i in response){
           
            switch (response[i].category_id){
              case 1: 
              $('.read-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
            break;

            case 2:
                $('.watch-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
                  break;

                  case 3:
                  $('.buy-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
                  break;
                  
                  case 4:
                $('.eat-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
                
                  break;
                 
                  case 5:
                $('.other-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
                  break;
            }
           
          }
        }
      })
    });
  })
            // console.log(response[i].category_id)
          //   if (response[i].category_id === 1){
          //     $('.read-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
          //   } 
          //       else if (response[i].category_id === 2){

          //         $('.watch-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
          //  } 
          //       else if (response[i].category_id === 3){
          //         $('.eat-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
          //      }
          //       else if (response[i].category_id === 4){

          //         $('.buy-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
          //      } 
          //      else if (response[i].category_id === 5){
          //       $('.other-container').append(`<ul> <li>${response[i].user_description}</li></ul>`)
          //      }
          //     }
  //         }
  //       })
  //     })
  //   })
  // // $('#form').on('submit',function (ev) {
  //   ev.preventDefault();
  //   var input = $('#form input').val();
  //   let newItem = $(`<div> ${input} </div>`)
  //   $('').preppend(newItem);
  
