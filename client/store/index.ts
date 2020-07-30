import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import axios from 'axios';

interface State {
  status: string;
  library: string[];
  config: {};
}

export const initialState = {
  status: '',
  library: [],
  config: {},
};

//ACTIONS
const GET_STATUS = 'GET_STATUS';
const GET_LIBRARY = 'GET_LIBRARY';
const GET_CONFIG = 'GET_CONFIG';

//ACTION CREATORS
const setStatusActionCreator = (status) => ({
  type: GET_STATUS,
  status,
});

const setLibraryActionCreator = (library) => ({
  type: GET_LIBRARY,
  library,
});

const setConfigActionCreator = (config) => ({
  type: GET_CONFIG,
  config,
});

//THUNKS
export const buildFetchStatusThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api');
      dispatch(setStatusActionCreator(data.isRunning));
    } catch (err) {
      console.log('ERROR fetching status', err);
    }
  };
};

export const buildFetchLibraryThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/library');

      dispatch(setLibraryActionCreator(data));
    } catch (err) {
      console.log('ERROR fetching status', err);
    }
  };
};

export const buildFetchConfigThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/config');
      dispatch(setConfigActionCreator(data));
    } catch (err) {
      console.log('ERROR fetching status', err);
    }
  };
};

const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case GET_STATUS:
      return { ...state, status: action.status };
    case GET_LIBRARY:
      return { ...state, library: action.library.audio };
    case GET_CONFIG:
      return { ...state, config: action.config.value };

    default: {
      return state;
    }
  }
};

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
);
