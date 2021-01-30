import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counter/counterSlice';
import settingsReducer from './slices/settings/settingsSlice';
import updaterReducer from './slices/updater/updaterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  settings: settingsReducer,
  updater: updaterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
