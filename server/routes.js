const passport = require('passport');
const PassportStrategies = require("./auth-strategies");
var mongoose = require ("mongoose");
const Authenticate = require("./authenticate");
var Poll = require("./models/poll-model");//Poll model for mongodb/mongoose

const authenticateLocal = passport.authenticate('local', { session: false });
const authenticateJWT = passport.authenticate('jwt', { session: false });

module.exports = function(app){

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

  app.get('/api/polls/getpoll',(req,resp)=>{
    Poll.findOne({id:req.query.id},function(err,poll){
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

  app.post('/api/polls/update/poll',authenticateJWT,(req,resp)=>{  //authenticateJWT
    console.log("app.post('/api/polls/update/poll'>>>",req.headers.authorization)

      Poll.update({id:req.body.poll.id},req.body.poll,function (err,p) {
        if (err) {
          console.error(err);
          resp.send("Error saving poll to DB", err);
        }else {
          console.log("updated poll", p)
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

  app.post('/api/polls/save/poll',authenticateJWT,(req,resp)=>{//authenticateJWT
    console.log("app.post('/api/polls/save/poll'>>>",req.headers)
      if(!(req.body.poll.id )){//&& req.body.author && req.body.title && req.body.options
        resp.status(422).send("error: poll incomplete");
      }
      const newPoll = new Poll({
        author: req.body.poll.author,
        title:  req.body.poll.title,
        options:  req.body.poll.options,
        id:  req.body.poll.id
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

  app.post('/api/polls/remove/poll',authenticateJWT,(req,resp)=>{
      Poll.remove({ id: req.body.id }, function (err) {
        if (err)  {
          console.log(`Error deleting poll:${req.body.id}`,err);
          resp.send(`Error deleting poll:${req.body.id}`,err);
        }
        resp.send(`success: deleted  poll:${req.body.id}`);
      });
  })

  app.post('/api/user/signup', Authenticate.signup);

  app.post('/api/user/signin', authenticateLocal, Authenticate.signin);

}
