import { useAppDispatch } from '@store';
import { setStatus } from '@store/slices/updater/updaterSlice';
import { ipcRenderer } from 'electron';
import { UpdateInfo } from 'electron-updater';
import React, { FC, useEffect } from 'react';
import { DownloadProgress } from '../../../../../types/electron';

const UpdaterIPC: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = () => {
      dispatch(setStatus('checking'));
    };
    const channel = 'UPDATER:checking';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = (_: Electron.IpcRendererEvent, info: UpdateInfo) => {
      dispatch(setStatus('found-update'));
    };
    const channel = 'UPDATER:found-update';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = () => {
      dispatch(setStatus('up-to-date'));
    };
    const channel = 'UPDATER:up-to-date';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = (
      _: Electron.IpcRendererEvent,
      progress: DownloadProgress
    ) => {
      dispatch(setStatus('download-progress'));
    };
    const channel = 'UPDATER:download-progress';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = (_: Electron.IpcRendererEvent, info: UpdateInfo) => {
      dispatch(setStatus('downloaded'));
    };
    const channel = 'UPDATER:downloaded';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = () => {
      dispatch(setStatus('before-quit-for-update'));
    };
    const channel = 'UPDATER:before-quit-for-update';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = (_: Electron.IpcRendererEvent, error: Error) => {
      dispatch(setStatus('error'));
    };
    const channel = 'UPDATER:error';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  return <></>;
};

export default UpdaterIPC;
