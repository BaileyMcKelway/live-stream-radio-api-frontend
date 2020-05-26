import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { OnlineSign } from './OnlineSign';
import { OfflineSign } from './OfflineSign';
import { Starting } from './Starting';

import { buildFetchStatusThunk } from '../../store';

import './StreamStatus.css';
export class DisconnectedStreamStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      starting: false,
    };
    this.startOnClick = this.startOnClick.bind(this);
    this.stopOnClick = this.stopOnClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.stopOnRestart = this.stopOnRestart.bind(this);
  }
  componentDidMount() {
    this.props.fetchStatus();
  }

  startOnClick = async () => {
    this.setState({ starting: true });
    await axios.get('/api/stream/start');
    this.setState({ starting: false });
    this.props.fetchStatus();
  };
  stopOnClick = async () => {
    await axios.get('/api/stream/stop');
    this.props.fetchStatus();
  };
  stopOnRestart = async () => {
    this.setState({ starting: true });
    await axios.get('/api/stream/restart');
    this.setState({ starting: false });
    this.props.fetchStatus();
  };
  render() {
    return (
      <div id="stream_status">
        <div className="box">
          <div className="status">
            <div className="box-header">
              <span className="status-title">Stream Status</span>
            </div>
            <div className="current-status">
              {this.state.starting ? (
                <Starting />
              ) : this.props.status ? (
                <OnlineSign />
              ) : (
                <OfflineSign />
              )}
            </div>
          </div>
          <div className="box-content">
            <div className="status-action">
              <button
                id="start"
                className="btn btn-deep-purple btn-md"
                onClick={this.startOnClick}
              >
                Start
              </button>
              <button
                className="btn btn-deep-purple btn-md"
                onClick={this.stopOnClick}
              >
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStatus: () => dispatch(buildFetchStatusThunk()),
  };
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export const StreamStatus = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedStreamStatus);
