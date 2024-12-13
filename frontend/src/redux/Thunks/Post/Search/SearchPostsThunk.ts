import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { PostState } from '../../../Reducers/Post';
import PostService from '../../../../services/Post/PostService';

export const fetchSearchPosts = createAsyncThunk(
  'fetchSearchPosts',
  async (fields: { text: string, authorization: string, page: number }) => {
    const response = await PostService.searchPosts(fields);
    return response;
  },
);

export function fetchSearchPostsBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchSearchPosts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchSearchPosts.fulfilled, (state, action) => {
      state.loading = false;

      // Lógica para manter a página correta mesmo que não tenha mais posts
      if (action.payload.result.posts.length <= 0) {
        return;
      }

      state.pages.searchPosts += 1;
      state.search.posts = [...state.search.posts, ...action.payload.result.posts];
    })
    .addCase(fetchSearchPosts.rejected, (state, action) => {
      state.loading = false;
      state.pages.searchPosts -= 1;
      console.log(action);
    });
}