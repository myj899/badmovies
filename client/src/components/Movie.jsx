import React from 'react';

// import key from '../../../server/config.js';

class Movie extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
    <li className="movie_item">
      <img src={`https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`} />
      <div className="movie_description">
        <h2 onclick={this.props.click(this.props.showFaves, this.props.movie)}>
          {this.props.movie.original_title}
        </h2>
        <section className="movie_details">
          <div className="movie_year">
            <span className="title">Release Date</span>
            <span>{this.props.movie.release_date}</span>
          </div>
          <div className="movie_rating">
            <span className="title">Rating</span>
            <span>{this.props.movie.vote_average}</span>
          </div>
        </section>
      </div>
    </li>
    );
  }
}

export default Movie;