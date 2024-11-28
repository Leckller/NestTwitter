import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Reducers/User';
import PostReducer from './Reducers/Post';

export const store = configureStore({
  reducer: {
    User: UserReducer,
    Post: PostReducer,
  },
});

// Esses tipos servem para criar os hooks do redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
