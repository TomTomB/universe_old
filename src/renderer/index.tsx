import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store';
import RootView from './domain/Shell/views/Root';

render(
  <React.StrictMode>
    <Provider store={store}>
      <RootView />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
