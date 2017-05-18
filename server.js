const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const tempPolls = require('./temp-polls');
const env = require('./.env');
const Routes = require("./server/routes");
//var mongoose = require ("mongoose");todo
//var Poll = require("./server/models/poll-model");//Poll model for mongodb/mongoose  todo



// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//set up database
var mongoose = require('mongoose');
mongoose.connect(`mongodb://${env.DB_USER}:${env.DB_PASS}@ds129031.mlab.com:29031/heroku_shwjhvsb`);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongoDB");// we're connected!
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
app.get('/api/polls/getall',(req,resp)=>{
  Poll.find({},{_id:0},function(err,polls){
    if (err) {
      console.error(err);
      resp.send("Error saving poll to DB", err);
    }else {resp.send(polls);}
  })
})

app.get('/api/polls/getUserPolls',(req,resp)=>{

  Poll.find({author:req.query.username},{_id:0},function(err,polls){
    if (err) {
      console.error(err);
      resp.send("Error saving poll to DB", err);
    }else {resp.send(polls);}
  })
})


app.get('/api/polls/getvote',(req,resp)=>{
  Poll.findOne({id:req.body.id},function(err,poll){
    if (err) {
      console.error(err);
      resp.send("Error saving poll to DB", err);
    }else {resp.send(poll);}
  })
})

app.post('/api/polls/test',(req,resp)=>{//todo
    const newPoll = new Poll({
      author: req.body.author,
      title:  req.body.title,
      options:  req.body.options,
      id:  req.body.id
    });
    newPoll.save(function (err,poll) {
      if (err) {
        console.error(err);
        resp.send("Error saving poll to DB", err);
      }else {resp.send("success");}
    });

})

app.post('/api/polls/update/vote',(req,resp)=>{
  Poll.update({id:req.body.id}, { options: req.body.options },function(err,raw){
    if(err){
      resp.send(`error updateing poll:${req.body.id}`,err);
      return console.log(`error updateing poll:${req.body.id}`,err);//todo
    }
    resp.status("200").send(raw);
    console.log("succes. mongo returned:",raw);//todo
  })
})

app.post('/api/polls/update/poll',(req,resp)=>{
    //const newPoll = new Poll(req.body);
    Poll.update({id:req.body.id},req.body,function (err,p) {
      if (err) {
        console.error(err);
        resp.send("Error saving poll to DB", err);
      }else {
        Poll.find(function(err,polls){
          if (err) {
            console.error(err);
            resp.send("Error retrieving polls from DB", err);
          }else{
            resp.send(polls);
          }
        })
      }
    });
})

app.post('/api/polls/save/poll',(req,resp)=>{
    const newPoll = new Poll({
      author: req.body.author,
      title:  req.body.title,
      options:  req.body.options,
      id:  req.body.id
    });
    newPoll.save(function (err,poll) {
      if (err) {
        console.error(err);
        resp.send("Error saving poll to DB", err);
      }else {
        resp.send("success!");
      }
    });
})

app.post('/api/polls/remove/poll',(req,resp)=>{
    console.log(`/api/polls/remove/poll`,req.body);
    Poll.remove({ id: req.body.id }, function (err) {
      if (err)  {
        console.log(`Error deleting poll:${req.body.id}`,err);
        resp.send(`Error deleting poll:${req.body.id}`,err);
      }
      resp.send(`success: deleted  poll:${req.body.id}`);
    });
})
*/

Routes(app);
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
