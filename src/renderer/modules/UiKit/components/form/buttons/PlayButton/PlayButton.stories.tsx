import { Meta, Story } from '@storybook/react';
import PlayButton, { PlayButtonProps, PlayButtonState } from '.';
import React from 'react';

export default {
  title: 'UiKit/Form/Buttons/PlayButton',
  component: PlayButton,
  args: {
    type: 'button',
  },
} as Meta;

const Template: Story<PlayButtonProps> = args => (
  <PlayButton {...args}>
    {args.buttonState === PlayButtonState.PLAY ||
    args.buttonState === PlayButtonState.PLAY_DISABLED
      ? 'Play'
      : args.buttonState === PlayButtonState.LOBBY ||
        args.buttonState === PlayButtonState.LOBBY_DISABLED
      ? 'Party'
      : args.buttonState === PlayButtonState.PATCHER
      ? Math.round(args.downloadProgress?.percent ?? 0) + '%'
      : ''}
  </PlayButton>
);

export const Play = Template.bind({});
Play.args = {
  prevButtonState: PlayButtonState.HIDDEN,
  buttonState: PlayButtonState.PLAY,
};

export const PlayDisabled = Template.bind({});
PlayDisabled.args = {
  prevButtonState: PlayButtonState.PLAY,
  buttonState: PlayButtonState.PLAY_DISABLED,
};

export const PlayDisabledToPlay = Template.bind({});
PlayDisabledToPlay.args = {
  prevButtonState: PlayButtonState.PLAY_DISABLED,
  buttonState: PlayButtonState.PLAY,
};

export const PlayDisabledToLobbyDisabled = Template.bind({});
PlayDisabledToLobbyDisabled.args = {
  prevButtonState: PlayButtonState.PLAY_DISABLED,
  buttonState: PlayButtonState.LOBBY_DISABLED,
};

export const PatcherWithInto = Template.bind({});
PatcherWithInto.args = {
  prevButtonState: PlayButtonState.HIDDEN,
  buttonState: PlayButtonState.PATCHER,
  downloadProgress: {
    percent: 70,
    total: 1000,
    transferred: 700,
  },
};

export const Patcher = Template.bind({});
Patcher.args = {
  prevButtonState: PlayButtonState.PATCHER,
  buttonState: PlayButtonState.PATCHER,
  downloadProgress: {
    percent: 70,
    total: 1000,
    transferred: 700,
  },
};

export const PatcherToPlay = Template.bind({});
PatcherToPlay.args = {
  prevButtonState: PlayButtonState.PATCHER,
  buttonState: PlayButtonState.PLAY,
};

export const LobbyDisabledToLobby = Template.bind({});
LobbyDisabledToLobby.args = {
  prevButtonState: PlayButtonState.LOBBY_DISABLED,
  buttonState: PlayButtonState.LOBBY,
};

export const LobbyDisabledToPlay = Template.bind({});
LobbyDisabledToPlay.args = {
  prevButtonState: PlayButtonState.LOBBY_DISABLED,
  buttonState: PlayButtonState.PLAY,
};

export const Hidden = Template.bind({});
Hidden.args = {
  prevButtonState: PlayButtonState.HIDDEN,
  buttonState: PlayButtonState.HIDDEN,
};
