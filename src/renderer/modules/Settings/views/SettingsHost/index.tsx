import { useAppDispatch } from '@store';
import {
  selectShowSettingsModal,
  setShowSettingsModal,
} from '@store/slices/settings/settingsSlice';
import Modal from '@uikit/components/modal/Modal';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SettingsModal = styled(Modal)`
  width: 696px;
  height: 582px;
  display: grid;
  grid-template-columns: 172px 1fr;
  grid-template-rows: auto 505px;
  grid-gap: 10px;
`;

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
      </SettingsModal>
    </>
  );
};

export default SettingsHost;
