
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
        data: {input}
      });
  });
  $('#form').on('submit',function (ev) {
    ev.preventDefault();
    var input = $('#form input').val();
    let newItem = $(`<div> ${input} </div>`)
    $('').preppend(newItem);
  })
});

