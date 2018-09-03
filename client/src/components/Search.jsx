import React from 'react';
import axios from 'axios';

import Genre from './Genre.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
         .then((res) => {
           this.setState({
             genres: res.data
           })
         })
         .catch((err) => {
           console.error(err);
         })
  }

  render() {
    // console.log(this.state.genres);
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {this.state.genres.map((genre) => (<Genre genre={genre}/>))}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;