/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();



// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var services = appenv.services;

var mysql_services = services["compose-for-mysql"];
assert(!util.isUndefined(mysql_services), "Must be bound to compose-for-mysql services");
var credentials = mysql_services[0].credentials;

var connectionString = credentials.uri;

var cors = require('cors');

var bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


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
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
