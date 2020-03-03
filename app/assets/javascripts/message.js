$(function(){ 
     function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="message__top">
              <div class="user-name">
                ${message.user_name}
              </div>
              <div class="time">
                ${message.created_at}
              </div>
            </div>
            <div class="message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="message__top">
              <div class="user-name">
                ${message.user_name}
              </div>
              <div class="time">
                ${message.created_at}
              </div>
            </div>
            <div class="messae__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main').append(html);
       $('form')[0].reset();
       $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
     })
     .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
     .always(function(){
      $('.submit__btn').attr('disabled', false);
    })
})
});