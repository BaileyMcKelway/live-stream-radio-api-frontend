import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Draggable from 'react-draggable';

type VideoPlayerProps = {
  video: boolean;
};

import './VideoPlayer.css';
const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [hidden, setHidden] = useState(!video);
  const config = require('../../../../config.json');
  const url = `https://www.twitch.tv/${config.twitch_name}`;
  useEffect(() => {
    setHidden(video);
  }, [video]);

  if (hidden === true) {
    return <div></div>;
  } else {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        scale={1}
      >
        <div className="video-player">
          <div id="controls_video">
            <div id="handle" className="handle">
              [drag]
            </div>
          </div>
          <ReactPlayer url={url} style={{ margin: 'auto' }} controls />
        </div>
      </Draggable>
    );
  }
};

export default VideoPlayer;
