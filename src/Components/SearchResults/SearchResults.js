import React from 'react';

import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js'

class SearchResults extends React.Component {
  render () {
    return (
      <div className="SearchResults">
      <h2>Results</h2>
        <TrackList Tracks={this.props.searchResults} onAdd={this.props.onAdd}/>
      </div>
    );
  }
}//SearchResults

export default SearchResults;