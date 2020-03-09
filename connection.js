const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "umang",
  password: "umang",
  database:"library"
});

module.exports = connection;

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log("connected");
  return ;
});
