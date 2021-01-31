/* eslint-disable no-console, global-require */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import * as Sentry from '@sentry/electron';
import { isDev, sentryURL } from '@shared/env';
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
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string =>
    path.join(RESOURCES_PATH, ...paths);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    frame: false,
    resizable: false,
    icon:
      process.platform === 'win32'
        ? getAssetPath('icon.ico')
        : getAssetPath('icon.png'),
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
      contextIsolation: true,
    },
  });

  if (isDev) {
    const port = process.env.PORT || 1212;
    mainWindow.loadURL(`http://localhost:${port}/dist`);
    splash.loadURL(`file://${path.join(__dirname, '../splash/index.html')}`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    splash.loadURL(`file://${__dirname}/splash/index.html`);
  }

  if (isDev) {
    await installExtensions();
    mainWindow.webContents.openDevTools();
  }

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

ipcMain.on('window-close', () => {
  mainWindow?.close();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('window-hide', () => {
  mainWindow?.minimize();
});
