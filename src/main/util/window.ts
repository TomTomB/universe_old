import { BrowserWindow } from 'electron';

export const getMainWindow = (): BrowserWindow | null => {
  const allWindows = BrowserWindow.getAllWindows();

  if (!allWindows.length) {
    return null;
  }

  const mainWindow = allWindows[0];

  return mainWindow;
};
