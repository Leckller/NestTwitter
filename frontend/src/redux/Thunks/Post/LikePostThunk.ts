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
      const post = state.posts.find(p => p.id === action.payload.result.postId);
      if (action.payload.result.removed) {
        post!.likes -= 1;
        post!.isLiked = false;
        return;
      }
      post!.isLiked = true;
      post!.likes += 1;
    })
    .addCase(fetchLikePost.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}