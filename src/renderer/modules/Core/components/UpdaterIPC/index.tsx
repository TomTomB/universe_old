/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect } from 'react';
import {
  setDownloadProgress,
  setStatus,
} from '@store/slices/updater/updaterSlice';
import { DownloadProgress } from '../../../../../types/electron';
import { UpdateInfo } from 'electron-updater';
import { ipcRenderer } from 'electron';
import { isDev } from '@shared/env';
import { useAppDispatch } from '@store';

const UpdaterIPC: FC = () => {
  const dispatch = useAppDispatch();

  const fakeUpdate = () => {
    dispatch(setStatus('checking'));
    setTimeout(() => {
      dispatch(setStatus('found-update'));
      setTimeout(() => {
        dispatch(setStatus('download-progress'));
        dispatch(
          setDownloadProgress({ percent: 0, total: 400, transferred: 1 })
        );
        setTimeout(() => {
          dispatch(setStatus('download-progress'));
          dispatch(
            setDownloadProgress({ percent: 25, total: 400, transferred: 1 })
          );
          setTimeout(() => {
            dispatch(setStatus('download-progress'));
            dispatch(
              setDownloadProgress({ percent: 50, total: 400, transferred: 1 })
            );
            setTimeout(() => {
              dispatch(setStatus('download-progress'));
              dispatch(
                setDownloadProgress({ percent: 75, total: 400, transferred: 1 })
              );
              setTimeout(() => {
                dispatch(setStatus('download-progress'));
                dispatch(
                  setDownloadProgress({
                    percent: 100,
                    total: 400,
                    transferred: 1,
                  })
                );
                setTimeout(() => {
                  dispatch(setStatus('downloaded'));
                  dispatch(setDownloadProgress(null));
                  setTimeout(() => {
                    fakeUpdate();
                  }, 1000);
                }, 1000);
              }, 5000);
            }, 5000);
          }, 5000);
        }, 150);
      }, 150);
    }, 1000);
  };

  if (isDev) {
    // dispatch(setStatus('download-progress'));
    // dispatch(
    //   setDownloadProgress({
    //     percent: 25,
    //     total: 400,
    //     transferred: 1,
    //   })
    // );
    // fakeUpdate();
  }

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
    const listener = (_: Electron.IpcRendererEvent, _info: UpdateInfo) => {
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
      dispatch(setDownloadProgress(progress));
    };
    const channel = 'UPDATER:download-progress';

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = (_: Electron.IpcRendererEvent, _info: UpdateInfo) => {
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
    const listener = (_: Electron.IpcRendererEvent, _error: Error) => {
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
