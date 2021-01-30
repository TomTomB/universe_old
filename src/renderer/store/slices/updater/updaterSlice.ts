import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/rootReducer';

export interface UpdaterSliceState {
  status:
    | 'init'
    | 'checking'
    | 'found-update'
    | 'up-to-date'
    | 'download-progress'
    | 'downloaded'
    | 'before-quit-for-update'
    | 'error';
}

const initialState: UpdaterSliceState = {
  status: 'init',
};

export const updaterSlice = createSlice({
  name: 'updater',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<UpdaterSliceState['status']>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = updaterSlice.actions;

export const setStatusAsync = (status: UpdaterSliceState['status']) => (
  dispatch: Dispatch
) => {
  dispatch(setStatus(status));
};

export const selectPlayLoginAnimations = (state: RootState) =>
  state.settings.playLoginAnimations;
export const selectPlayLoginMusic = (state: RootState) =>
  state.settings.playLoginMusic;
export const selectReplayLoginMusicAndVideoId = (state: RootState) =>
  state.settings.replayLoginMusicAndVideoId;

export default updaterSlice.reducer;
