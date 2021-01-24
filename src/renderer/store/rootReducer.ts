import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
