import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchSearch = createAsyncThunk(
  'fetchSearch',
  async (fields: { text: string, authorization: string }) => {
    const response = await PostService.search(fields);
    return response;
  },
);

export function fetchSearchBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.search = action.payload.result;
    })
    .addCase(fetchSearch.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}