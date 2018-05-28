import React from 'react';

import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render () {
    return (
      <div className="TrackList">
        {this.props.Track.map(track => {
          return <Track
            key={Track.id}
            track={track}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval} />
          })
        }
      </div>
    );
  }
}//TrackList

export default TrackList;
