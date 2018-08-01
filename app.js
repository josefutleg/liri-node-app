var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var inquirer = require('inquirer');
var movieName;
var songName;


inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["Find a Movie", "Find a Song"],
      name: "command"
    }
  ])
  .then(function(inquirerResponse) {
    console.log(inquirerResponse.command);
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
          songSearch()
        })
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
    
  

// var cmd = process.argv[2];

// if (cmd == 'spotify-this-song'){
function songSearch(){
      var spotify = new Spotify ({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    // spotify
    // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    // .then(function(data) {
    //   console.log(data.artists); 
    // })
    // .catch(function(err) {
    //   console.error('Error occurred: ' + err); 
    // });
    // var songArr = process.argv.slice(3);
    // var songName = songArr.join('+');
    spotify.search({ type: 'track', query: songName, limit: 2}, function(err, data) {
        // console.log(spotify);
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(`Track Name: ${data.tracks.items[0].name}`);
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        // console.log(data.tracks.items[1].name);
        // console.log(data.tracks.items[1].artists[1].name);
        // console.log(data);

        // spotify:track:0hrBpAOgrt8RXigk83LLNE
      });
}

// }

// if (cmd == 'movie-this'){
//     var movieArr = process.argv.slice(3);
//     var movieName = movieArr.join('+');
//     var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
//     request(queryUrl, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//           console.log(`Title: ${JSON.parse(body).Title}`);   
//           console.log(`Released: ${JSON.parse(body).Released}`);
//           console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);
//           console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
//           console.log(`Produced In: ${JSON.parse(body).Country}`);
//           console.log(`Language: ${JSON.parse(body).Language}`);            
//           console.log(`Rated: ${JSON.parse(body).Rated}`);
//           console.log(`Actors: ${JSON.parse(body).Actors}`);                                 
//           console.log(`Plot: ${JSON.parse(body).Plot}`); 
//         }
//       });
// }




