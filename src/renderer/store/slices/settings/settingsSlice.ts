import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/rootReducer';
import { generateId } from '@uikit/util';

export interface SettingsSliceState {
  playLoginAnimations: boolean;
  playLoginMusic: boolean;
  replayLoginMusicAndVideoId: string;

  showSettingsModal: boolean;
}

const initialState: SettingsSliceState = {
  playLoginAnimations: true,
  playLoginMusic: true,
  replayLoginMusicAndVideoId: generateId(),

  showSettingsModal: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    togglePlayLoginAnimations: state => {
      state.playLoginAnimations = !state.playLoginAnimations;
    },
    togglePlayLoginMusic: state => {
      state.playLoginMusic = !state.playLoginMusic;
    },
    replayLoginMusicAndVideo: state => {
      state.replayLoginMusicAndVideoId = generateId();
    },

    setShowSettingsModal: (state, action: PayloadAction<boolean>) => {
      state.showSettingsModal = action.payload;
    },
  },
});

export const {
  togglePlayLoginAnimations,
  togglePlayLoginMusic,
  replayLoginMusicAndVideo,
  setShowSettingsModal,
} = settingsSlice.actions;

export const selectPlayLoginAnimations = (state: RootState) =>
  state.settings.playLoginAnimations;
export const selectPlayLoginMusic = (state: RootState) =>
  state.settings.playLoginMusic;
export const selectReplayLoginMusicAndVideoId = (state: RootState) =>
  state.settings.replayLoginMusicAndVideoId;

export const selectShowSettingsModal = (state: RootState) =>
  state.settings.showSettingsModal;

export default settingsSlice.reducer;
