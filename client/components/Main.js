import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  buildFetchStatusThunk,
  buildFetchLibraryThunk,
  buildFetchConfigThunk,
} from '../store';

import { StreamStatus } from './OnlineStatus/StreamStatus';
import { StreamInformation } from './StreamInfo/StreamInformation';
import { Library } from './StreamInfo/Library';
import VideoPlayer from './Video/Chat/VideoPlayer.js';
import { Chat } from './Video/Chat/Chat.js';

import './Main.css';
export class DisconnectedMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: true,
      chat: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchStatus();
    this.props.fetchLibrary();
    this.props.fetchConfig();
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div id="main">
        <div id="top">
          <StreamStatus />
          <StreamInformation />
        </div>
        <label className="container">
          Video
          <input
            type="checkbox"
            name="video"
            onClick={() => this.setState({ video: !this.state.video })}
          ></input>
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Chat
          <input
            type="checkbox"
            name="chat"
            onClick={() => this.setState({ chat: !this.state.chat })}
          ></input>
          <span className="checkmark"></span>
        </label>

        <div id="middle">
          <VideoPlayer video={this.state.video} />
          <Chat chat={this.state.chat} />
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
