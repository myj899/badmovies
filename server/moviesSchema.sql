-- SET UP SCHEMA HERE
DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  release_date VARCHAR(255) NOT NULL,
  rating VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);