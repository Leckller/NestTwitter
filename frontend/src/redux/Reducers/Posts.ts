import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType } from '../../types';

interface PostState {
  posts: PostType[]

}

const initialState: PostState = {
  posts: [],
};

export const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {

    setPosts(state, action: PayloadAction<PostType[]>) {
      state.posts = action.payload;
    },

    addPost(state, action: PayloadAction<PostType>) {
      state.posts = [action.payload, ...state.posts];
    },

    // setLikePost(state, action: PayloadAction<>) {
    // },

  },
});

export const { addPost, setPosts } = PostSlice.actions;

export default PostSlice.reducer;
