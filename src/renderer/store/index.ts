import { configureStore } from '@reduxjs/toolkit';
import { isTest } from '@uikit/util/env';
import { useDispatch } from 'react-redux';
import { save, load } from './middleware/localstorage-sync';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      save({ states: ['settings'], namespace: 'universe', debounce: 300 })
    ),
  preloadedState: load({
    namespace: 'universe',
    states: ['settings'],
    disableWarnings: isTest,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
