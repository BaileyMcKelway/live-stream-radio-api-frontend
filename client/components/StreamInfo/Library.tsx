import * as React from 'react';
import { connect } from 'react-redux';

type LibraryProps = {
  library: string[];
};

import './Library.css';
export const DisconnectedLibrary = (props: LibraryProps) => {
  const library = props.library;
  return (
    <div id="library">
      {library.length <= 0 ? (
        <div></div>
      ) : (
        <div className="box">
          <div className="box-header">
            <span className="library-title">Library</span>
          </div>
          <div className="box-content">
            <ul>
              {library.map((song, index = 0) => {
                return <li key={index}>{song}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  library: state.library,
});

export const Library = connect(mapStateToProps, null)(DisconnectedLibrary);
