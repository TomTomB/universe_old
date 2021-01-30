import { BrowserWindow } from 'electron';

// eslint-disable-next-line import/prefer-default-export
export const getMainWindow = () => {
  const allWindows = BrowserWindow.getAllWindows();

  if (!allWindows.length) {
    return null;
  }

  const mainWindow = allWindows[0];

  return mainWindow;
};
