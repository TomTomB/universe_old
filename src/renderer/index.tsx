import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store';
import * as Sentry from '@sentry/electron';
import { isProd } from '@uikit/util';
import RootView from './modules/Shell/views/Root';

Sentry.init({
  dsn:
    'https://7a7bda98ee08405485c17ba4004e77a0@o512127.ingest.sentry.io/5610895',
  enabled: isProd,
});

render(
  <React.StrictMode>
    <Provider store={store}>
      <RootView />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
