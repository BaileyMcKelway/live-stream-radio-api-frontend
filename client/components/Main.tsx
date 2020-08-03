import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  buildFetchStatusThunk,
  buildFetchLibraryThunk,
  buildFetchConfigThunk,
} from '../store';

import { StreamStatus } from './OnlineStatus/StreamStatus';
import { StreamInformation } from './StreamInfo/StreamInformation';
import { Library } from './StreamInfo/Library';
import VideoPlayer from './Video/Chat/VideoPlayer';
import { Chat } from './Video/Chat/Chat';

type MainProps = {
  fetchStatus: () => void;
  fetchLibrary: () => void;
  fetchConfig: () => void;
};

type MainState = {
  video: boolean;
  chat: boolean;
};

import './Main.css';
export function DisconnectedMain(props: MainProps) {
  const [video, setVideo] = useState(true);
  const [chat, setChat] = useState(true);

  useEffect(() => {
    props.fetchStatus();
    props.fetchLibrary();
    props.fetchConfig();
  }, []);

  return (
    <div id="main">
      <div id="top">
        <StreamStatus />
        <StreamInformation />
      </div>
      <div className="checkboxes">
        <label className="container">
          Video
          <input
            type="checkbox"
            name="video"
            onClick={() => {
              setVideo(!video);
            }}
          />
          <span className="checkmark" />
        </label>

        <label className="container">
          Chat
          <input
            type="checkbox"
            name="chat"
            onClick={() => {
              setChat(!chat);
            }}
          />
          <span className="checkmark" />
        </label>
      </div>
      <div id="middle">
        <VideoPlayer video={video} />
        <Chat chat={chat} />
      </div>
      <div id="bottom">
        <Library />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchStatus: () => dispatch(buildFetchStatusThunk()),
  fetchLibrary: () => dispatch(buildFetchLibraryThunk()),
  fetchConfig: () => dispatch(buildFetchConfigThunk()),
});

export const Main = connect(null, mapDispatchToProps)(DisconnectedMain);
