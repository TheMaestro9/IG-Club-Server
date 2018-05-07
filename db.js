var mysql = require('mysql');
var settings = {
  host: "127.0.0.1", 
  port: "3306", 
  user: "root", 
  password: "1234",
  database: "IgClub"
}
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();