import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Reducers/User';
import PopupReducer from './Reducers/Popup';
import PostsReducer from './Reducers/Posts';

export const store = configureStore({
  reducer: {
    User: UserReducer,
    PopUp: PopupReducer,
    Posts: PostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
