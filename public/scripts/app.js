
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
  var input = $('#form input').val();
  console.log(input);
  $('#form input').val('');
      $.ajax({
        method: 'POST',
        url: '/add-item'
      });
  });
});

