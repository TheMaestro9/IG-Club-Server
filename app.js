/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express');
const logger = require('morgan')

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
const cfenv = require('cfenv');

// create a new express server
const app = express();


const assert = require('assert');
const util = require('util')

const mysql = require('mysql');

const models = require('./models');


const passport = require('passport');

// initialize the passport
app.use(passport.initialize());

//load passport strategies
const newStrategy = require("./config/passport/passport")(passport, models.User);


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();

const services = appEnv.services;

const cors = require('cors');

const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'))


// if it's running in production or loacl (development)
if (!appEnv.isLocal) {
  var mysql_services = services["compose-for-mysql"];
  assert(!util.isUndefined(mysql_services), "Must be bound to compose-for-mysql services");
  var credentials = mysql_services[0].credentials;

  var connectionString = credentials.uri;



  function handleDisconnect() {
    connection = mysql.createConnection(credentials.uri); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
      if (err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      } 
      else{
        console.log('connected to the Data Base')
      }                                    // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
      console.log('db error', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }

  handleDisconnect();
}

// Routers
const signup = require("./auth/signup.router");
const login = require("./auth/login.router");
const userRouter = require("./routers/user");
const homeRouter = require("./routers/home");
const coursesRouter = require('./routers/courses')
app.use("/signup", signup);
app.use("/login", login);
app.use("/user", userRouter);
app.use("/home", homeRouter);
app.use("/courses" , coursesRouter)


app.get("/hello", function(request,response){

  response.send("hello"); 

});



app.get("/query", function (request, response) {

  // execute a query on our database
  var qstring = request.query.q;
  // console.log(qstring);
  connection.query(qstring, function (err, result) {
    if (err) {
      console.log(err);
      if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {

        connection.connect(function (err) {
          if (err) {
            console.log(err);
          }
        });

      }
      response.status(500).send(err);
    } else {
      response.send(result);
    }

  });
});

app.get('/test' ,function (request, response) {
  var token = request.query.token;  
  //const config = require("config/passport/config");
  const jwt = require("jsonwebtoken");

    jwt.verify(token, "12345-67890-09876-54321", function (err, decoded) {
        if (err) {
            var err = new Error('You are not authenticated!');   
            err.status = 401;
            console.log(err)
            response.send(err)
        } else {
            // if everything is good, save to request for use in other routes
            console.log(decoded) ; 
            response.send(decoded)
        }
    });
  }); 


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  err.success = false
  res.status(err.status || 500);
  res.json({
    "error": err.message,
    "success": err.success
  });
});


// // start server on the specified port and binding host
// app.listen(appEnv.port, '0.0.0.0', function() {
//   // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
//   // console.log(app.address());
// });



/* 
 * when the app run, sequlize will chack if the tabels exist or not.
 * if its the first run and the tables are not existing, it will create it.
 * For more infomation about how this realy warking check these links:
 * http://sequelize.readthedocs.io/en/1.7.0/articles/express/
 * https://stackoverflow.com/questions/12487416/how-to-organize-a-node-app-that-uses-sequelize#13151025
 **/
const debug = require('debug')('express-sequelize')
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  app.listen(appEnv.port, function() {
    debug('Express server listening on port ' + appEnv.port);
    // console.log('Express server listening on port ' + appEnv.port);
  });
  app.on('error', onError);
  app.on('listening', onListening);
})
.catch(err => {
  console.log(err)
})


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = app.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
