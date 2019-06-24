function renderItem(data) {
  $("#read-container").append(data)
}

function loadItems(callback) { //$jquery/ ajax request to load new tweets onto page and add tweets to database
  $.ajax({
    type: "GET",
    url: "/get-items",
    success: callback
  })
};


loadItems(function (response) {
  response.forEach((item) => renderItem(item))
});


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

$('button#add-item').on('click',function (ev) {
  ev.preventDefault();
  var input = $('input.search-bar').val();
  console.log(input);
  $('#form input').val('');
      $.ajax({
        method: 'POST',
        url: '/add-item',
        data: {input},
        success: loadItems.bind(null, function (response) {
          const lastItem = response[response.length - 1];
          renderItem(lastItem);
      })
  });
  // $('#form').on('submit',function (ev) {
  //   ev.preventDefault();
  //   var input = $('#form input').val();
  //   let newItem = $(`<div> ${input} </div>`)
  //   $('').preppend(newItem);
  // })
});
});

