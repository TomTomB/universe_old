import React, { useEffect, useState } from 'react';
import {
  selectDownloadProgress,
  selectStatus,
} from '@store/slices/updater/updaterSlice';
import { PlayButton as PlayButtonComponent } from '@uikit/components/form';
import { PlayButtonState } from '@uikit/components/form/buttons/PlayButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const StyledPlayButton = styled(PlayButtonComponent)`
  position: absolute;
  top: 10px;
  left: 29px;
  z-index: 100;
`;

const PlayButton = () => {
  const updaterStatus = useSelector(selectStatus);
  const updaterDownloadProgress = useSelector(selectDownloadProgress);

  const [playButtonState, setPlayButtonState] = useState({
    prev: PlayButtonState.HIDDEN,
    curr: PlayButtonState.HIDDEN,
  });

  useEffect(() => {
    if (
      updaterStatus === 'found-update' ||
      updaterStatus === 'download-progress'
    ) {
      setPlayButtonState({
        prev: PlayButtonState.HIDDEN,
        curr: PlayButtonState.PATCHER,
      });
    } else {
      setPlayButtonState({
        prev: PlayButtonState.PATCHER,
        curr: PlayButtonState.HIDDEN,
      });
    }
  }, [updaterStatus]);

  return (
    <StyledPlayButton
      type="button"
      downloadProgress={updaterDownloadProgress}
      buttonState={playButtonState.curr}
      prevButtonState={playButtonState.prev}
    >
      {playButtonState.curr === PlayButtonState.PLAY ||
      playButtonState.curr === PlayButtonState.PLAY_DISABLED
        ? 'Play'
        : playButtonState.curr === PlayButtonState.LOBBY ||
          playButtonState.curr === PlayButtonState.LOBBY_DISABLED
        ? 'Party'
        : playButtonState.curr === PlayButtonState.PATCHER
        ? Math.round(updaterDownloadProgress?.percent ?? 0) + '%'
        : ''}
    </StyledPlayButton>
  );
};

export default PlayButton;
