console.log('main.js loaded');
$(document).ready(function() {
  $('.followButton').click(function(e) {
    e.preventDefault();
    var id = $(this).attr('id')
    var url = '/follow/' + id
    $.ajax({
      url: url,
      type: 'POST'
    }).done(function(){
      $('.button.tiny.change').addClass("white");
      $('.change').text('Followed')
    })
  })
})
