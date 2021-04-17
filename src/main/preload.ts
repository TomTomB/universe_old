import { UniverseAPI } from '../types/window';
import { contextBridge } from 'electron';

const universeAPI: UniverseAPI = {
  doAThing: () => {
    return null;
  },
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
};

contextBridge.exposeInMainWorld('universe', universeAPI);
