/* eslint-disable no-console, global-require */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { app, BrowserWindow, ipcMain, protocol, shell } from 'electron';
import * as Sentry from '@sentry/electron';
import { isDev, sentryURL } from '@shared/env';
import path from 'path';
import * as Protocol from './util/protocol';
import LCUConnector from './lcu/lcu-connector';
import Logger from './util/logger';
import AppUpdater from './updater/appUpdater';

Sentry.init({
  dsn: sentryURL,
  enabled: app.isPackaged,
});

let mainWindow: BrowserWindow | null = null;
let lcuConnector: LCUConnector | null = null;
let updater: AppUpdater | null = null;

protocol.registerSchemesAsPrivileged([
  {
    scheme: Protocol.scheme,
    privileges: {
      standard: true,
      secure: true,
    },
  },
]);

const installExtensions = () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');

  return installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then((name: string) => console.log(`Added Extension:  ${name}`))
    .catch((err: unknown) => console.log('An error occurred: ', err));
};

const createWindow = async () => {
  if (app.isPackaged) {
    protocol.registerFileProtocol(Protocol.scheme, Protocol.requestHandler);
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    frame: false,
    resizable: false,
    backgroundColor: '#010a13',
    fullscreenable: false,
    center: true,
    webPreferences: {
      devTools: !app.isPackaged,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const splash = new BrowserWindow({
    width: 810,
    height: 610,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreenable: false,
    center: true,
    resizable: false,
    webPreferences: {
      devTools: !app.isPackaged,
      contextIsolation: true,
    },
  });

  if (isDev) {
    const port = process.env.PORT || 1212;
    mainWindow.loadURL(`http://localhost:${port}/dist`);
    splash.loadURL(`file://${path.join(__dirname, '../splash/index.html')}`);
  } else {
    mainWindow.loadURL(`${Protocol.scheme}://dist/index.html`);
    splash.loadURL(`${Protocol.scheme}://splash/index.html`);
  }

  if (isDev) {
    await installExtensions();

    mainWindow.webContents.once('dom-ready', () => {
      if (!mainWindow) {
        return;
      }
      mainWindow.webContents.openDevTools();
    });
  }

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.once('did-finish-load', () => {
    splash.destroy();

    if (!mainWindow) {
      Logger.error('Main window is null');
      return;
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    updater = new AppUpdater();
    updater.start();

    lcuConnector = new LCUConnector();
    lcuConnector.start();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
};

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    return true;
  })
  .catch((e) => Logger.error(e));

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('second-instance', () => {
  if (mainWindow?.isMinimized()) {
    mainWindow?.restore();
  }

  mainWindow?.show();
});

app.on('web-contents-created', (_event, contents) => {
  contents.on('will-navigate', (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = [`http://localhost:${process.env.PORT || 1212}`];

    if (!validOrigins.includes(parsedUrl.origin)) {
      Logger.warn(
        `The application tried to redirect to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`
      );

      contentsEvent.preventDefault();
    }
  });

  contents.on('will-redirect', (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const validOrigins: string[] = [];

    if (!validOrigins.includes(parsedUrl.origin)) {
      Logger.warn(
        `The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`
      );

      contentsEvent.preventDefault();
    }
  });

  contents.on('will-attach-webview', (_contentsEvent, webPreferences) => {
    delete webPreferences.preload;
  });

  contents.on('new-window', async (contentsEvent, navigationUrl) => {
    Logger.warn(
      `The application tried to open a new window at the following address: '${navigationUrl}'. This attempt was blocked.`
    );
    contentsEvent.preventDefault();
  });
});

app.on('remote-require', (event) => {
  event.preventDefault();
});

// built-ins are modules such as "app"
app.on('remote-get-builtin', (event) => {
  event.preventDefault();
});

app.on('remote-get-global', (event) => {
  event.preventDefault();
});

app.on('remote-get-current-window', (event) => {
  event.preventDefault();
});

app.on('remote-get-current-web-contents', (event) => {
  event.preventDefault();
});

ipcMain.on('window-close', () => {
  mainWindow?.close();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('window-hide', () => {
  mainWindow?.minimize();
});
