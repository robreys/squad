
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var userModel  = require('./models/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'squad';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var data = require('./data.json');

// Step 2: Remove all existing documents
userModel
  .find({})
  .remove()
  .exec(onceClear); // callback to continue at

var saveCount = data.users.length
// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);
  for (var i = 0; i < data.users.length; i++) {
    (new userModel(data.users[i])).save(function(err) {
      if (err) console.log(err);
      if (--saveCount <= 0) {
        console.log('DONE');
        mongoose.connection.close();
      }
    });
  }
}

