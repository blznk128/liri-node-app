require("dotenv").config();
var request = require("request");
var fs = require("fs");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: '34e90776f1f943dfb57e2f2ec856c027',
    secret: '69856a403aef42c493123fac4f7091ee',
  });
var input = process.argv;
var command = input[2];
var name = "";
for (i = 3; i < input.length; i++) {
	name = name + " " + input[i];
}
 if (command === "movie-this") {
 	 if (name === "") {
 	 	name = "Mr. Nobody";
 	 }
	var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
	request.get(queryUrl, function(error, response, body) {
	  	if (!error && response.statusCode === 200) {
	  		for (i = 0; i < JSON.parse(body).Ratings.length; i++) {
	  			if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	  				tomatoesRating = JSON.parse(body).Ratings[i].Value;
	  			}
	  			if (JSON.parse(body).Ratings[i].Source === "Internet Movie Database") {
	  				internetRating = JSON.parse(body).Ratings[i].Value;
	  			}
	  		}
              var myMovie =
                console.log(queryUrl);
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMdB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
    		    console.log(myMovie);
  		}
	});
}
if (command === "concert-this") {
    var woo = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/"+ woo + "/events?app_id=ff31f4cc8c067fdf6162c39a32241e75&date=upcoming";
   request.get(queryUrl, function(error, response, body) {
         if (!error && response.statusCode === 200) {
             
            console.log(queryUrl)
            if (error) console.log(error);
            var result  =  JSON.parse(body)[0];
            console.log("Venue name " + result.venue.name);
            console.log("Location " + result.venue.city);
            console.log("Date " +  moment(result.datetime).format("MM/DD/YYYY"));
         }
   });
}
    if (command === "spotify-this-song") {
        if (name === "") {
              name = "The Sign"
          }
        spotify.search({ type: 'track', query: name, limit: 6 }, function(err, data) {
         if (err) {
            return console.log('Error occurred: ' + err);
          }
          var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
        })
        
    }

    if (command === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data){
            if (error) {
                return console.log(error);
            }
            var nameArr = data.split(",");
            name = nameArr[1]
            spotify.search({ type: 'track', query: name, limit: 1 }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
	        console.log("Album: " + songInfo[0].album.name);
            })
        });
    }
    
     