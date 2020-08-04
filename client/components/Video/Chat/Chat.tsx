import * as React from 'react';
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

type ChatProps = {
  chat: boolean;
};

import './Chat.css';
export const Chat = (props: ChatProps) => {
  const [hidden, setHidden] = useState(!props.chat);
  const config = require('../../../../config.json');
  const src = `https://www.twitch.tv/embed/${config.twitch_name}/chat?parent=www.example.com`;
  useEffect(() => {
    setHidden(props.chat);
  }, [props.chat]);

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
        <div className="video-player handle">
          <div id="controls">
            <div id="handle" className="handle">
              [drag]
            </div>
          </div>
          <iframe id="chat_embed" src={src} height="500" width="350"></iframe>
        </div>
      </Draggable>
    );
  }
};
