import './styles/font-faces.scss';
import * as Sentry from '@sentry/electron';
import * as Styles from '@styles';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import React from 'react';
import RootView from './modules/Shell/views/Root';
import UpdaterIPC from '@core/components/UpdaterIPC';
import { isProd } from '@uikit/util';
import packageJSON from '../../package.json';
import { render } from 'react-dom';
import { sentryURL } from '@shared/env';
import store from '@store';

Sentry.init({
  dsn: sentryURL,
  enabled: isProd,
  release: `v${packageJSON.version}`,
});

render(
  <Provider store={store}>
    <StyleSheetManager disableVendorPrefixes>
      <>
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
  document.getElementById('root')
);
