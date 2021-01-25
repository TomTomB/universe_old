import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/rootReducer';

export interface SettingsSliceState {
  playLoginAnimations: boolean;
  playLoginMusic: boolean;
}

const initialState: SettingsSliceState = {
  playLoginAnimations: true,
  playLoginMusic: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    togglePlayLoginAnimations: (state) => {
      state.playLoginAnimations = !state.playLoginAnimations;
    },
    togglePlayLoginMusic: (state) => {
      state.playLoginMusic = !state.playLoginMusic;
    },
  },
});

export const {
  togglePlayLoginAnimations,
  togglePlayLoginMusic,
} = settingsSlice.actions;

export const selectPlayLoginAnimations = (state: RootState) =>
  state.settings.playLoginAnimations;
export const selectPlayLoginMusic = (state: RootState) =>
  state.settings.playLoginMusic;

export default settingsSlice.reducer;
