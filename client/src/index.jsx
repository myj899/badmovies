import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
      currentGenre: null
    };
    
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeGenre = this.changeGenre.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    if (this.state.currentGenre) {
      axios.post('/search', {genre: this.state.currentGenre})
      .then((movies) => {
        this.setState({
          movies: movies.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
    } else {
      axios.get('/search')
      .then((movies) => {
        this.setState({
          movies: movies.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
    }
    
    // make an axios request to your server on the GET SEARCH endpoint
  }

  saveMovie(movie) {
    console.log('WHY AM I NOT TRIGGERED HERE')
    // axios.post('/save', {movie: movie})
    //   .then((movies) => {
    //     // console.log('I AM FUCKING TRIGGERED')
    //     this.setState({
    //       favorites: movies.data
    //     })
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
  }

  deleteMovie(movie) {
    // same as above but do something diff
    axios.post('/delete', {movie: movie})
      .then((movies) => {
        this.setState({
          favorites: movies.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }
  
  onClick(isFaves, movie) {
    console.log('FAVES ON?', isFaves)
    console.log('MOVIE GETTING TRIGGERED', movie.original_title);
    if (isFaves) {
      this.deleteMovie(movie);
    } else {
      this.saveMovie(movie);
    }
  }

  changeGenre(genre) {
    console.log('changeGenre triggered', genre)
    this.setState({
      currentGenre: genre
    })
  }

  handleSearch(evt) {
    console.log('SEARCH GETTING TRIGGERED...')
    axios.post('/search', {genre: this.state.currentGenre})
         .then((movies) => {
           this.setState({
             movies: movies
           })
         .catch((err) => {
           console.error(err);
         })
         })
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} 
                  showFaves={this.state.showFaves}
                  changeGenre={this.changeGenre}
                  handleSearch={this.handleSearch}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
                  showFaves={this.state.showFaves}
                  click={this.onClick}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));