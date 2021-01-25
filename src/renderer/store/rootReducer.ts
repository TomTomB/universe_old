import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import settingsReducer from './settings/settingsSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
