import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { OnlineSign } from './OnlineSign';
import { OfflineSign } from './OfflineSign';
import { Starting } from './Starting';

import { buildFetchStatusThunk } from '../../store';

type StreamStatusState = {
  status: boolean;
  starting: boolean;
};

type StreamStatusProps = {
  fetchStatus: () => void;
  fetchedStatus: boolean;
};

import './StreamStatus.css';
export class DisconnectedStreamStatus extends React.Component<
  StreamStatusProps,
  StreamStatusState
> {
  constructor(props: StreamStatusProps) {
    super(props);
    this.state = {
      status: props.fetchedStatus,
      starting: false,
    };
    this.startOnClick = this.startOnClick.bind(this);
    this.stopOnClick = this.stopOnClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchStatus();
  }
  componentDidUpdate(prevProps: any) {
    if (prevProps.fetchedStatus !== this.props.fetchedStatus) {
      this.setState({
        status: this.props.fetchedStatus,
      });
    }
  }

  startOnClick = async () => {
    this.setState({ starting: true });
    await axios.get('/api/stream/start');
    this.setState({ starting: false });
    this.props.fetchStatus();
    this.setState({ status: this.props.fetchedStatus });
  };
  stopOnClick = async () => {
    await axios.get('/api/stream/stop');
    this.props.fetchStatus();
  };
  render() {
    return (
      <div id="stream_status">
        <div className="status">
          <div className="box-header">
            <span className="status-title">Stream Status</span>
          </div>
          <div className="current-status">
            {this.state.starting ? (
              <Starting />
            ) : this.state.status ? (
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
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchStatus: () => dispatch(buildFetchStatusThunk()),
  };
};

const mapStateToProps = (state: any) => ({
  fetchedStatus: state.status,
});

export const StreamStatus = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedStreamStatus);
