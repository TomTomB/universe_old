import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { isStorybook, isTest } from '@shared/env';
import { useDispatch } from 'react-redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { save, load } from './middleware/localstorage-sync';
import rootReducer from './rootReducer';

export const history = createHashHistory();

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [
    ...getDefaultMiddleware(),
    routerMiddleware(history),
    save({ states: ['settings'], namespace: 'universe', debounce: 300 }),
  ],
  preloadedState: load({
    namespace: 'universe',
    states: ['settings'],
    disableWarnings: isTest || isStorybook,
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
