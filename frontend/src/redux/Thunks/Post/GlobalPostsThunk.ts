import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalPostRequest } from '../../../types/Post/GlobalPost.Request';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchGlobalPosts = createAsyncThunk(
  'fetchGlobalPosts',
  async (fields: GlobalPostRequest) => {
    const response = await PostService.getGlobalPosts(fields);
    return response;
  },
);

export function fetchGlobalPostsBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchGlobalPosts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchGlobalPosts.fulfilled, (state, action) => {
      state.loading = false;

      // Lógica para manter a página correta mesmo que não tenha mais posts
      if (action.payload.result.length <= 0) {
        return;
      }

      state.pages.global += 1;
      state.posts = [...state.posts, ...action.payload.result];
    })
    .addCase(fetchGlobalPosts.rejected, (state, action) => {
      state.loading = false;
      state.pages.global -= 1;
      console.log(action);
    });
}