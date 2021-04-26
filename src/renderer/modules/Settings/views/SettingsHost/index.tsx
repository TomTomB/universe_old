import React, { FC } from 'react';
import {
  selectShowSettingsModal,
  setShowSettingsModal,
} from '@store/slices/settings/settingsSlice';
import Modal from '@uikit/components/modal/Modal';
import styled from 'styled-components';
import { useAppDispatch } from '@store';
import { useSelector } from 'react-redux';

const SettingsModal = styled(Modal)`
  width: 696px;
  height: 582px;
  display: grid;
  grid-template-columns: 172px 1fr;
  grid-template-rows: auto 505px;
  grid-gap: 10px;
`;

const asciiEmoji = [
  '¯_(ツ)_/¯',
  'ಠ_ಠ',
  'ʕ•ᴥ•ʔ',
  '(╯°□°)╯︵ ┻━┻',
  '(งಠᗝಠ)ง',
  'ಥ_ಥ',
];

let randomEmojiIndex = Math.floor(Math.random() * asciiEmoji.length);
let randomEmoji = asciiEmoji[randomEmojiIndex];

const SettingsHost: FC = () => {
  const showSettingsModal = useSelector(selectShowSettingsModal);
  const dispatch = useAppDispatch();

  const onDoneClick = () => {
    dispatch(setShowSettingsModal(false));
  };

  return (
    <>
      <SettingsModal
        bottomButtons={[{ buttonText: 'Done', click: onDoneClick }]}
        show={showSettingsModal}
        backdropClick={onDoneClick}
      >
        <h1>Settings</h1>
        <br />
        <h2>Nothing here yet</h2>
        <h3>{randomEmoji}</h3>
      </SettingsModal>
    </>
  );
};

export default SettingsHost;
