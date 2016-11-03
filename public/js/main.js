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

  $('#commentUser').submit(function(e) {
    e.preventDefault();
    // console.log(e.currentTarget.value);
    // var url = $(this).attr('action')
    var ideaID = $('#submitButton').val()
    var data = {comment: $('#ideaComment').val()}
    $.ajax({
      url: "http://localhost:3000/idea/comment/" + ideaID,
      type: 'POST',
      data: data
    }).done(function(data){
      console.log(data)
      $('.allcomment').append(
        '<p>' + data.data.comment + '</p>'
      )
    })
  })
})
