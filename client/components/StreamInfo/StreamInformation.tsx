import React from 'react';
import { connect } from 'react-redux';

type StreamInformationProps = {
  config: any;
};

import './StreamInformation.css';
export const DisconnectedStreamInformation: React.FC<StreamInformationProps> = ({
  config,
}) => {
  return (
    <div id="stream_information">
      <div className="box">
        <div className="box-header">
          <span className="information-title">Stream Information</span>
        </div>
        <div className="box-content">
          <p>
            <b>Stream Name:</b>
            {'Live Stream Radio, 24/7 Open Source Radio'}
          </p>
          <p>
            <b>Video Resolution:</b>
            {config.video_width + 'x' + config.video_height}
          </p>
          <p>
            <b>Video FPS:</b>
            {config.video_fps}
          </p>
          <p>
            <b>Video Bitrate:</b>
            {config.video_bit_rate}
          </p>
          <p>
            <b>Audio Bitrate:</b>
            {config.audio_bit_rate}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  config: state.config,
});

export const StreamInformation = connect(mapStateToProps)(
  DisconnectedStreamInformation
);

{
  /* <p><b>Stream Name:</b> {{config.value.radio.overlay.title.text}}</p>
<p><b>Video Resolution:</b> {{config.value.video_width}}x{{config.value.video_height}}</p>
<p><b>Video FPS:</b> {{config.value.video_fps}}</p>
<p><b>Video Bitrate:</b> {{config.value.video_bit_rate}}</p>
<p><b>Audio Bitrate:</b> {{config.value.audio_bit_rate}}</p> */
}
