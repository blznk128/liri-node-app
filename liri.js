//require("dotenv").config();
var request = require("request");
//var keys = require('./keys.js');

var movie = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});