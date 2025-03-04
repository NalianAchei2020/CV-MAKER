import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './templateSlice';
import cvReducer from './cvSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// ✅ Setup Redux Store
export const store = configureStore({
  reducer: {
    templates: templateReducer,
    cvs: cvReducer,
  },
});

// ✅ Setup Typed Hooks for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
