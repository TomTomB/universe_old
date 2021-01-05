import React from 'react';
import { ipcRenderer } from 'electron';

const TitleBarButton = ({ label }: { label: string }) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => ipcRenderer.send('window-close')}
    >
      X
    </button>
  );
};

export default TitleBarButton;
