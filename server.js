const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const env = require('./.env');
const Routes = require("./server/routes");

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

Routes(app);
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
