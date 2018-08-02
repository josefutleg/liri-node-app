var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var inquirer = require('inquirer');
var movieName, songName;


inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["Find a Movie", "Find a Song", "I Don't Care"],
      name: "command"
    }
  ])
  .then(function(inquirerResponse) {
    // console.log(inquirerResponse.command);
      if (inquirerResponse.command == 'Find a Movie'){
        inquirer
        .prompt([
          {
            type: "input",
            message: "Name a Movie",
            name: "movie"
          },
        ])
        .then(function(movie){
          movieName = movie.movie;
          if (movieName == ''){
            movieName = 'jurassic park'
          }
          movieSearch()
        })
      }
      if (inquirerResponse.command == 'Find a Song'){
        inquirer
        .prompt([
          {
            type: "input",
            message: "Name a Song",
            name: "song"
          },
        ])
        .then(function(song){
          songName = song.song;
          if (songName == ''){
            songName = 'ace of base'
          }
          songSearch()
        })
      }
      if (inquirerResponse.command == "I Don't Care"){
        songName = 'ace of base'
        movieName = 'jurassic park'        
        songSearch() || movieSearch();
      }
    });
 

function movieSearch(){
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
  request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(`Title: ${JSON.parse(body).Title}`);   
        console.log(`Released: ${JSON.parse(body).Released}`);
        console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
        console.log(`Produced In: ${JSON.parse(body).Country}`);
        console.log(`Language: ${JSON.parse(body).Language}`);            
        console.log(`Rated: ${JSON.parse(body).Rated}`);
        console.log(`Actors: ${JSON.parse(body).Actors}`);                                 
        console.log(`Plot: ${JSON.parse(body).Plot}`); 
      }
    });
}

function songSearch(){
      var spotify = new Spotify ({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: songName,}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(`Track Name: ${data.tracks.items[0].name}`);
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        console.log(`Album: ${data.tracks.items[0].album.name}`);
        console.log(`Spotify Link: ${data.tracks.items[0].external_urls.spotify}`);
        
        //ace of base the sign spoitfy URI (for default)
        // spotify:track:0hrBpAOgrt8RXigk83LLNE
      });
}





