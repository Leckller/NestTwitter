import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchCreateComment = createAsyncThunk(
  'fetchCreateComment',
  async (fields: { text: string, authorization: string, postId: number }) => {
    const response = await PostService.createComment(fields);
    return response;
  },
);

export function fetchCreateCommentBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchCreateComment.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCreateComment.fulfilled, (state, action) => {
      state.loading = false;

      (state.localPost === 'bubble' ? state.bubblePosts : state.posts).find(p => p.id === action.payload.result.postId)!.comments += 1;
      state.postDetails?.postComments.unshift(action.payload.result.comment);
      console.log(action);
    })
    .addCase(fetchCreateComment.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}