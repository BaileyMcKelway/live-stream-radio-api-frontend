import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  buildFetchStatusThunk,
  buildFetchLibraryThunk,
  buildFetchConfigThunk,
} from '../store';

import { StreamStatus } from './StreamStatus';
import { StreamInformation } from './StreamInformation';
import { Library } from './Library';
import { VideoPlayer } from './VideoPlayer.js';
import { Chat } from './Chat.js';

import './Main.css';
export class DisconnectedMain extends Component {
  componentDidMount() {
    this.props.fetchStatus();
    this.props.fetchLibrary();
    this.props.fetchConfig();
  }
  render() {
    return (
      <div id="main">
        <div id="top">
          <StreamStatus />
          <StreamInformation />
        </div>
        <div id="middle">
          <VideoPlayer />
          <Chat />
        </div>
        <div id="bottom">
          <Library />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchStatus: () => dispatch(buildFetchStatusThunk()),
  fetchLibrary: () => dispatch(buildFetchLibraryThunk()),
  fetchConfig: () => dispatch(buildFetchConfigThunk()),
});

export const Main = connect(null, mapDispatchToProps)(DisconnectedMain);
