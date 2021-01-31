import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counterReducer from './slices/counter/counterSlice';
import settingsReducer from './slices/settings/settingsSlice';
import updaterReducer from './slices/updater/updaterSlice';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    settings: settingsReducer,
    updater: updaterReducer,
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
