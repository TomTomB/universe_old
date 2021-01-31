import { configureStore } from '@reduxjs/toolkit';
import { isTest } from '@shared/env';
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

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('./rootReducer').default;

    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
