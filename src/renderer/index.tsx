import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store';
import * as Sentry from '@sentry/electron';
import { isProd } from '@uikit/util';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import * as Styles from '@styles';
import UpdaterIPC from '@core/components/UpdaterIPC';
import { sentryURL } from '@shared/env';
import RootView from './modules/Shell/views/Root';

Sentry.init({
  dsn: sentryURL,
  enabled: isProd,
});

render(
  // <React.StrictMode>
  <Provider store={store}>
    <StyleSheetManager disableVendorPrefixes>
      <>
        <Styles.FontFaces />
        <Styles.Reset />

        <UpdaterIPC />
        <ThemeProvider theme={Styles.theme}>
          <Styles.Scrollbar />
          <Styles.BodyTypography />
          <Styles.HeadingTypography />
          <RootView />
        </ThemeProvider>
      </>
    </StyleSheetManager>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
