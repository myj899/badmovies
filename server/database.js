const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  // get favorites from the database
  var queryStr = `SELECT * FROM favorites`;
  connection.query(queryStr, function(err, results) {
    callback(err, results);
  })
};

const saveFavorite = function(params, callback) {
  // save movie to favorites in the database
  // console.log('TRIGGEREEDDDDD')
  var queryStr = `INSERT IGNORE INTO favorites(title, release_date, rating) VALUES (?, ?, ?)`;
  connection.query(queryStr, params, function(err, results) {
    // console.log('RESULTS', results);
    callback(err, results);
  })
};

const deleteFavorite = function(params, callback) {
  // delete a movie from favorites in the database
  var queryStr = `DELETE FROM favorites
                  WHERE title = ?`;
  connection.query(queryStr, params, function(err, results) {
    callback(err, results);
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};