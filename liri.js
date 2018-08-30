require("dotenv").config();
var keys = require("./keys");
var request = require('request');

//------------------OMDB API--------------------

function searchOMDB() {

    var omdbURL = 'http://www.omdbapi.com/?t=' + itemName + "&apikey=" + keys.omdb.id;

    request(omdbURL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML
    });

}

//-------------------Spotify API---------------------

function searchSpotify() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: itemName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data);
        //console.log(Object.keys(data.tracks.items));
        //console.log(Object.keys(data.tracks.items[0]));
        //console.log(data.tracks.items[0].artists[0]);
        var spotifyItems = data.tracks.items;

        spotifyItems.forEach(function (element) {
            console.log(element.artists[0]);
            console.log(Object.keys(element.artists[0]));
            console.log(element.name);
            console.log(element.href);
        });

    });

}

//-----------------Bands In Town API -----------------------

function searchBandsInTown() {

    var bandsInTownURL = 'https://rest.bandsintown.com/artists/' + itemName + "/events?app_id=" + keys.bandsintown.id;

    request(bandsInTownURL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML

        //console.log(data);
        //console.log(Object.keys(data.tracks.items));

    });
}

//-------------------------------------------------

var userCommand = process.argv[2];
var itemName = process.argv[3];

function checkCommand() {
    switch (userCommand) {
        case "concert-this":
            searchBandsInTown();
            break;
        case "spotify-this-song":
            searchSpotify();
            break;
        case "movie-this":
            searchOMDB();
            break;
        case "do-what-it-says":
            //Statements executed when the
            //result of expression matches valueN

            break;

        default:
            console.log("Please write a valid command...");
            break;
    }
}


checkCommand();