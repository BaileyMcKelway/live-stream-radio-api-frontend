import React from 'react';
import ReactPlayer from 'react-player';

export const VideoPlayer = (props) => {
  return (
    <div className="video-player">
      <ReactPlayer
        url="https://www.twitch.tv/beatsiebb"
        style={{ margin: 'auto' }}
        controls
        width="250%"
        height="100%"
      />
    </div>
  );
};
