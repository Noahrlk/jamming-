import React from 'react';
import './PlayList.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

handleNameChange(event) {
  this.props.onNameChange(event.target.value);
}

  render () {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.props.handleNameChange} />
        <this.props.TrackList Track={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval='true' />
        <a clasName="Playlist-save" onclick={this.props.onSave} >SAVE TO SPOTIFY</a>
      </div>
    );
  }
}//PlayList

export default Playlist;
