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
    .addCase(fetchLikePost.fulfilled, (state, { payload: { result: { postId, removed } } }) => {
      state.loading = false;

      if (state.localPost === 'profile') {
        const post = state.profile?.posts.find(p => p.id === postId);

        if (removed) {
          post!.likes -= 1;
          post!.isLiked = false;
          return;
        }

        post!.isLiked = true;
        post!.likes += 1;
        return;
      }

      if (state.localPost === 'details') {

        if (state.postDetails?.id === postId) {
          if (removed) {
            state.postDetails.likes -= 1;
            state.postDetails.isLiked = false;
            return;
          }

          state.postDetails.isLiked = true;
          state.postDetails.likes += 1;
          return;
        }

        const post = state.postDetails?.postComments.find(p => p.comment.id === postId);

        if (removed) {
          post!.comment.likes -= 1;
          post!.comment.isLiked = false;
          return;
        }

        post!.comment.isLiked = true;
        post!.comment.likes += 1;
        return;
      }

      const post = (state.localPost === 'bubble' ? state.bubblePosts : state.posts).find(p => p.id === postId);

      if (removed) {
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