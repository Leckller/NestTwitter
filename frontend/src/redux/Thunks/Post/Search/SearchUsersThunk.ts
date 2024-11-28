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
        state.pages[state.localPost] -= 1;
        return;
      }

      state.search.users = [...state.search.users, ...action.payload.result.users];
    })
    .addCase(fetchSearchUsers.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}