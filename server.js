const express = require('express');


const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/polls',(req,resp)=>{
  const auth= req.query.auth;
  const q_id= req.query.qid;
  if(!auth && !q_id){
    resp.json({
      error: 'Missing required parameter `auth` or `qid`',
    });
    return;
  }

  resp.json({msg:"search params found", auth:auth, PollID:q_id,});
})


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
