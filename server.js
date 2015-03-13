var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mailer = require("nodemailer");

server.listen(1111);
//Connecting /publick dir
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.end('ok');
})
var smtpTransport = mailer.createTransport("SMTP",{
  service: "Yahoo",
  auth: {
    user: "username@yahoo.com",
    pass: "password"
  }
});
//Connecting to the mongo dir
mongo.connect("mongodb://localhost:27017/messages",  function(err, db) {
  if(err) throw err;
  var col = db.collection('messages');

  io.on('connection', function (socket) {
    console.log("connected");
  //pushing message to client.
    socket.on("clientMsg", function (data) {
      console.log(data);
      var name = data.name
      var message = data.msg
      col.insert({name: name, message: message}, function(){
        console.log("Inserted");
      });
    //send the data to the client
      socket.emit("serverMsg", data);

    //send the data to all the clients
      socket.broadcast.emit("serverMsg", data);
      });
    //sending Logs from chat to email
    socket.on("getData", function (data) {
      var mail = data
      smtpTransport.sendMail(mail, function(error, response){
        if(error){
          console.log(error);
        }else{
          console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
      });
      })
     });
})
