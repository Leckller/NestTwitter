import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchPostComments = createAsyncThunk(
  'fetchPostComments',
  async (fields: { postId: number, authorization: string, page: number }) => {
    const response = await PostService.getPostComments(fields);
    return response;
  },
);

export function fetchPostCommentsBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchPostComments.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPostComments.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload.result.postComments.length <= 0) {
        return;
      }

      state.pages.details += 1;
      state.postDetails!.postComments = [...state.postDetails?.postComments!, ...action.payload.result.postComments];

    })
    .addCase(fetchPostComments.rejected, (state, action) => {
      state.loading = false;
      state.pages.details -= 1;
      console.log(action);
    });
}