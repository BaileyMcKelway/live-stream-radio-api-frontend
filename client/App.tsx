import * as React from 'react';
import { Provider } from 'react-redux';

import { Header } from './components/Header';
import { Main } from './components/Main';

import { store } from './store';

import './App.css';
export const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="content">
          <Header />
          <Main />
        </div>
      </div>
    </Provider>
  );
};
