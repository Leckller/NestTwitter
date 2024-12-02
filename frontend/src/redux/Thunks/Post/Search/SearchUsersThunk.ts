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

      // Lógica para manter a página correta mesmo que não tenha mais posts
      if (action.payload.result.users.length <= 0) {
        state.pages.searchUsers -= 1;
        return;
      }
      state.pages.searchUsers += 1;
      state.search.users = [...state.search.users, ...action.payload.result.users];
    })
    .addCase(fetchSearchUsers.rejected, (state, action) => {
      state.loading = false;
      state.pages.searchUsers -= 1;
      console.log(action);
    });
}