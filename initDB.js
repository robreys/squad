
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
var squadModel = require('./models/squad');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'squad';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri

// Step 1: empty database
mongoose.connect(database_uri, function() {
  mongoose.connection.db.dropDatabase();
});


// Do the initialization here

// Step 1: load the JSON data
var data = require('./data.json');

// Step 2: populate databse
userModel
  .find({})
  .exec(onceClear); // callback to continue at
var addedSquads = false;
var saveCount = data.users.length + data.squads.length;
// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);
  for (var i = 0; i < data.users.length; i++) {
    (new userModel(data.users[i])).save(function(err, user) {
      if (err) console.log(err);
      if (!addedSquads) {
        addedSquads = true;
        --saveCount;
        //add all squads to first user
        for (var j = 0; j < data.squads.length; j++) {
          //add user to squad
          data.squads[j].admin = user._id;
          (new squadModel(data.squads[j])).save(function(err, squad) {
            if (err) console.log(err);
            //add squad to user
            user.squads.push(squad._id);
            user.save(function(err) {
              if (err) console.log(err);
              if (--saveCount <= 0) {
                console.log('DONE');
                mongoose.connection.close();
              }
            });
          });
        }
      }
      else if (--saveCount <= 0) {
        console.log('DONE');
        mongoose.connection.close();
      }
    });
  }
}

