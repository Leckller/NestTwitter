import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePostRequest } from '../../../types/Post/CreatePost.Request';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchCreatePost = createAsyncThunk(
  'fetchCreatePost',
  async (fields: CreatePostRequest) => {
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
      state.posts.unshift({ ...action.payload.result, comments: 0, likes: 0 });
    });
}