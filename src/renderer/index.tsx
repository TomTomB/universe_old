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
import { ipcRenderer } from 'electron';
import RootView from './modules/Shell/views/Root';

Sentry.init({
  dsn:
    'https://7a7bda98ee08405485c17ba4004e77a0@o512127.ingest.sentry.io/5610895',
  enabled: isProd,
});

ipcRenderer.on('checking-for-update', () => {
  console.log('checking for update');
});

ipcRenderer.on('update-available', (_, info) => {
  console.log('update-available', info);
});

ipcRenderer.on('update-not-available', () => {
  console.log('update-not-available');
});

ipcRenderer.on('update-download-progress', (_, progress) => {
  console.log('update-download-progress', progress);
});

ipcRenderer.on('update-downloaded', (_, info) => {
  console.log('update-downloaded', info);
});

ipcRenderer.on('before-quit-for-update', () => {
  console.log('before-quit-for-update');
});

ipcRenderer.on('update-error', (_, error) => {
  console.log('update-error', error);
});

render(
  <React.StrictMode>
    <Provider store={store}>
      <StyleSheetManager disableVendorPrefixes>
        <>
          <FontFaces />
          <Reset />
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
