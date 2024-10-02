import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Reducers/User';
import PopupReducer from './Reducers/Popup';

export const store = configureStore({
  reducer: {
    User: UserReducer,
    PopUp: PopupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
