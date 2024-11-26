import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchBubblePosts = createAsyncThunk(
  'fetchBubblePosts',
  async (fields: { page: number, authorization: string }) => {
    const response = await PostService.getBubblePosts(fields);
    return response;
  },
);

export function fetchBubblePostsBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchBubblePosts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchBubblePosts.fulfilled, (state, action) => {
      state.loading = false;

      // Lógica para evitar que o usuário fique fazendo requisição
      // desnecessária quando o banco de dados não possui mais posts
      if (action.payload.result.length <= 0) {
        state.isMaxPage = true;
        state.globalPage -= 1;
        return;
      }

      state.isMaxPage = false;
      state.bubblePosts = [...state.bubblePosts, ...action.payload.result];
    })
    .addCase(fetchBubblePosts.rejected, (state, action) => {
      state.loading = false;
      state.isMaxPage = true;
      console.log(action);
    });
}