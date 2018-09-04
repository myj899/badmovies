import React from 'react';

class Genre extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <option value={this.props.genre.id}
              onclick={this.props.changeGenre(this.value)}>
        {this.props.genre.name}
      </option>
    )
  }
}

export default Genre;