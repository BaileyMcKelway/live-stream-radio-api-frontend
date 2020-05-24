import React from 'react';

export const Chat = (props) => {
  return (
    <div className="video-player">
      <iframe
        id="chat_embed"
        src="https://www.twitch.tv/embed/beatsiebb/chat?parent=www.example.com"
        height="500"
        width="350"
      ></iframe>
    </div>
  );
};
