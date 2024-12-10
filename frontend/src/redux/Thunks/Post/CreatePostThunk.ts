import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchCreatePost = createAsyncThunk(
  'fetchCreatePost',
  async (fields: { text: string, authorization: string }) => {
    const response = await PostService.createPost(fields);
    return response;
  },
);

export function fetchCreatePostBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchCreatePost.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCreatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = [{
        ...action.payload.result,
        comments: 0, likes: 0,
        isLiked: false
      }, ...state.posts];
      state.bubblePosts = [{
        ...action.payload.result,
        comments: 0, likes: 0,
        isLiked: false
      }, ...state.bubblePosts];
      if (action.payload.result.user.id === state.profile?.user.id) {
        state.profile.posts.unshift({ ...action.payload.result, comments: 0, likes: 0, isLiked: false });
      }
    });
}