import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../../services/Post/PostService';
import { PostState } from '../../../Reducers/Post';


export const fetchSearchUsers = createAsyncThunk(
  'fetchSearchUsers',
  async (fields: { text: string, authorization: string, page: number }) => {
    const response = await PostService.searchUsers(fields);
    return response;
  },
);

export function fetchSearchUsersBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchSearchUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchSearchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.search.users = [...state.search.users, ...action.payload.result.users];
    })
    .addCase(fetchSearchUsers.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}