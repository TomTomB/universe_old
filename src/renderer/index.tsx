import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store';
import * as Sentry from '@sentry/electron';
import { isProd } from '@uikit/util';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import HeadingTypography from '@styles/typo/Heading';
import BodyTypography from '@styles/typo/Body';
import Scrollbar from '@styles/Scrollbar';
import FontFaces from '@styles/FontFaces';
import Reset from '@styles/Reset';
import RootView from './modules/Shell/views/Root';
import UpdaterIPC from './modules/Core/components/UpdaterIPC';

Sentry.init({
  dsn:
    'https://7a7bda98ee08405485c17ba4004e77a0@o512127.ingest.sentry.io/5610895',
  enabled: isProd,
});

render(
  <React.StrictMode>
    <Provider store={store}>
      <StyleSheetManager disableVendorPrefixes>
        <>
          <FontFaces />
          <Reset />

          <UpdaterIPC />
          <ThemeProvider theme={theme}>
            <Scrollbar />
            <BodyTypography />
            <HeadingTypography />
            <RootView />
          </ThemeProvider>
        </>
      </StyleSheetManager>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
