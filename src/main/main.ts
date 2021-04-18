import { join } from 'path';
import * as Protocol from './util/protocol';
import { BrowserWindow, app, ipcMain, protocol, shell } from 'electron';
import AppUpdater from './updater/appUpdater';
import LCUConnector from './lcu/lcu-connector';
import Logger from './util/logger';
import { init } from '@sentry/electron/dist/main';
import { sentryURL } from '../shared/constants';

init({
  dsn: sentryURL,
  enabled: app.isPackaged,
  release: `v${app.getVersion()}`,
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
    VUEJS_DEVTOOLS,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require('electron-devtools-installer');

  return installExtension([VUEJS_DEVTOOLS])
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
      preload: join(app.getAppPath(), 'preload.js'),
      sandbox: true,
    },
  });

  const splash = new BrowserWindow({
    width: 500,
    height: 230,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreenable: false,
    center: true,
    resizable: false,
    webPreferences: {
      devTools: !app.isPackaged,
      sandbox: true,
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL(`http://localhost:8080`);
    splash.loadURL(`file://${join(app.getAppPath(), 'splash/index.html')}`);
  } else {
    mainWindow.loadURL(`${Protocol.scheme}://renderer/index.html`);
    splash.loadURL(`${Protocol.scheme}://splash/index.html`);
  }

  if (!app.isPackaged) {
    await installExtensions();

    mainWindow.webContents.once('dom-ready', () => {
      if (!mainWindow) {
        return;
      }
      mainWindow.webContents.openDevTools();
    });
  }

  mainWindow.webContents.once('did-finish-load', () => {
    splash.destroy();

    if (!mainWindow) {
      Logger.error('Main window is null');
      return;
    }

    mainWindow.show();
    mainWindow.focus();

    updater = new AppUpdater();
    if (app.isPackaged) {
      updater.start();
    }

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

ipcMain.on('window-close', () => {
  mainWindow?.close();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('window-hide', () => {
  mainWindow?.minimize();
});
