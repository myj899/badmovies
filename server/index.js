var express = require('express');
var body = require('body-parser');
// var request = require('request');
var app = express();
var axios = require('axios');
const token = require('./config.js').API_KEY;
const db = require('./database.js');

var apiHelpers = require('./apiHelpers.js');

app.use(body.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
  // get the search genre     

  // https://www.themoviedb.org/account/signup

  // use this endpoint to search for movies by genres, you will need an API key

  // https://api.themoviedb.org/3/discover/movie

  // and sort them by horrible votes using the search parameters in the API
  // console.log("REQUEST", req.bodyParser.genreid);
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${token}&sort_by=popularity.asc`)
       .then((response) => {
         //console.log(response.data.results);
         res.send(response.data.results);
       })
       .catch((err) => {
         console.error(err);
       })

});

app.post('/search', function(req, res) {
  console.log('GENRE NAME', req.body.genre);
  axios.post(`https://api.themoviedb.org/3/discover/movie?api_key=${token}&sort_by=popularity.asc&with_genres=${req.body.genre.name}`)
       .then((response) => {
         res.send(response.data.results);
       })
       .catch((err) => {
         console.error(err);
       })
})

app.get('/genres', function(req, res) {
  // make an axios request to get the list of official genres
  
  // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

  // send back
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${token}`)
    .then((response) => {
      res.send(response.data.genres);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/save', function(req, res) {
  // console.log('REQUEST', req.body.movie);
  // console.log('SAVING FOR SOME REASON')
  var params = [req.body.movie.original_title, 
                (req.body.movie.release_date)? req.body.movie.release_date: "", 
                req.body.movie.vote_average]
  db.saveFavorite(params, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      // console.log('SAVED RESULTS', results)
      db.getAllFavorites((err, results) => {
        // console.log('FAVORITES', results);
        res.send(results);
      })
    }
  });
});

app.post('/delete', function(req, res) {
  db.deleteFavorite([req.body.movie.id], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      // console.log('SAVED RESULTS', results)
      db.getAllFavorites((err, results) => {
        res.send(results);
      })
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
