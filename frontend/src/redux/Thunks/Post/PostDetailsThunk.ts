import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { PostDetailsRequest } from '../../../types/Post/PostDetails.Request';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchPostDetails = createAsyncThunk(
  'fetchPostDetails',
  async (fields: PostDetailsRequest) => {
    const response = await PostService.getPostDetails(fields);
    return response;
  },
);

export function fetchPostDetailsBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchPostDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPostDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.postDetails = action.payload.result;

      if (action.payload.result.postComments.length <= 0) {
        state.pages.details -= 1;
        return;
      }
      state.pages.details += 1;
    })
    .addCase(fetchPostDetails.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}