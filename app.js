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
      choices: ["Find a Movie", "Find a Song",'Twitter', "Surprise Me"],
      name: "command"
    }
  ])
  .then(function(inquirerResponse) {
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
// default search if no input is read
          if (movieName == ''){
            movieName = 'jurassic park'
          }
          fs.appendFile('log.txt', `${movieName},`, function(err, data){
            if (err){
              console.log(err);
            }
          })
// run movie search function
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
//default search if no input read
          if (songName == ''){
            songName = 'ace of base'
          }
//add input to log
          fs.appendFile('log.txt', `${songName},`, function(err, data){
            if (err){
              console.log(err);
            }
          })
//run song search function
          songSearch()
        })
      }
      if (inquirerResponse.command == "Twitter"){
        inquirer
        .prompt([
          {
            type: "list",
            message: "What would you like to do?",
            choices: ["Read My Tweets", "Post A Tweet"],
            name: "command"
          }
        ])
        .then(function(twitterResponse){
          if(twitterResponse.command == 'Read My Tweets'){
            console.log('Tweets!');
            //write function that will use the client.get command from npm twitter to display latest tweets
          }
          if(twitterResponse.command == 'Post A Tweet'){
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Write your Tweet!",
                  name: "tweet"
                },
              ])
              .then(function(tweet){
                // write function using client.post command to update twitter status
                console.log('done!');
                console.log('----------------');                 
                console.log(`"${tweet.tweet}"`);
                console.log('----------------');                                 
              })
          }
        })
 
      }
//if 'surprise me' is chosen, a random function will run.
      if (inquirerResponse.command == "Surprise Me"){
        fs.readFile('random.txt', 'utf8', function(err, data){
          if (err){
            console.log(err);
          }
          var rNum = Math.floor(Math.random()*8);
          var dataArr = data.split(',');
          if (rNum % 2 == 0){
          songName = dataArr[1];            
            songSearch();
          }else
          {
          movieName = dataArr[0];            
            movieSearch();
          }
        })
      }
    });
 

function movieSearch(){
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
  request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var results = JSON.parse(body);
        console.log('----------------');                            
        console.log(`Title: ${results.Title}`);   
        console.log(`Released: ${results.Released}`);
        console.log(`IMDB Rating: ${results.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${results.Ratings[1].Value}`);
        console.log(`Produced In: ${results.Country}`);
        console.log(`Language: ${results.Language}`);            
        console.log(`Rated: ${results.Rated}`);
        console.log(`Actors: ${results.Actors}`);                                 
        console.log(`Plot: ${results.Plot}`);
        console.log('----------------');                             
      }
    });
}

function songSearch(){
      var spotify = new Spotify ({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var trackInfo = data.tracks.items;
        for (var i in trackInfo){
          console.log('----------------');          
          console.log(`Track Name: ${trackInfo[i].name}`);
          console.log(`Artist: ${trackInfo[i].artists[0].name}`);
          console.log(`Album: ${trackInfo[i].album.name}`);
          console.log(`Spotify Link: ${trackInfo[i].external_urls.spotify}`);
          console.log('----------------');
        }
      });
}





