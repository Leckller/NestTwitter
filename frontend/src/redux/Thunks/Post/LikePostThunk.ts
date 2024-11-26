import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchLikePost = createAsyncThunk(
  'fetchLikePost',
  async ({ postId, authorization }: { postId: number, authorization: string }) => {
    const response = await PostService.likePost({ postId, authorization });
    return response;
  },
);

export function fetchLikePostBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchLikePost.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchLikePost.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      if (action.payload.result.removed) {
        state.posts.find(p => p.id === action.payload.result.postId)!.likes -= 1;
        return;
      }
      state.posts.find(p => p.id === action.payload.result.postId)!.likes += 1;
    })
    .addCase(fetchLikePost.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}