(function(){
  var name
  var email
  var send
  var app = angular.module('myPage', [])

  app.controller('Swicher', function(){
    this.data = me;
  });
  socket = io.connect("http://localhost:1111");
  $('.chat-textarea').keydown(function(event){
    if (event.keyCode === 13)
      socket.emit("clientMsg", {
        "name": name,
        "msg": $(".chat-textarea").val()
    });
  });
  $('#button').on('click', function(){
    send = $(".chat-messages").html();
    socket.emit("getData", {
      from: "Anton Eardrop <eardropmail@yahoo.com>",
      to: email,
      subject: "Aw, Do you like my page?",
      text: "",
      html: send
      })
  });
  socket.on("serverMsg", function (data) {
    $(".chat-messages").append("<strong>" + data.name + "</strong>: " + data.msg + "<br/>");
    $(".chat-textarea").val(null);
  });
  var me =   {
    aboutMe: "My nany is Anthony. I'm 20 years old",
    activities: "Reading about cuantum physics or playing music.",
    angular: "Mean.io is pretty nice. JSJSJSJSJSJ :D. But I'm still a bit confused about angular.",
    img: [
    "http://36.media.tumblr.com/284c43cd9104e16959cea4052e732fa2/tumblr_mf8johstyl1qk9u5do1_400.jpg",
    "http://data3.whicdn.com/images/61706771/thumb.jpg",
    "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=87895514"
    ]
}

  go = function(){
    if (answer.value == ''){
      $(".question").toggleClass( "shake" )
    } else {
      name = answer.value;
      $(".question").animate({
        top: "150%"
      }, 400);
      $(".question2").animate({
        top: "36%"
      }, 400);
    }
  };
  go2 = function(){
    if (answer2.value == ''){
      $(".question2").toggleClass( "shake" )
    } else {
      email = answer2.value;
      $("#nope").animate({
        top: "100%"
      }, 400);
      $(".question2").animate({
        top: "150%"
      }, 400);
    }
  };
  moveR = function(){
      $(".page").animate({
        right: "100%"
      }, 400);
    }
  moveL = function(){
    $(".page").animate({
      right: "0%"
    }, 400);
  }
})();
