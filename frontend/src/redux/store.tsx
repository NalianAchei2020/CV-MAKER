import { configureStore } from '@reduxjs/toolkit';

import cvReducer from './cvSlice';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector,
} from 'react-redux';
import { templatesReducer } from './templateSlice';

// ✅ Setup Redux Store
export const store = configureStore({
  reducer: {
    template: templatesReducer,
    cvs: cvReducer,
  },
});

// ✅ Setup Typed Hooks for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
