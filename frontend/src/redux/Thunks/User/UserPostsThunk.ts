import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import UserService from '../../../services/User/UserService';
import { PostState } from '../../Reducers/Post';

export const fetchUserPosts = createAsyncThunk(
  'fetchUserPosts',
  async ({ userId, authorization, page }: { page: number, userId: number, authorization: string }) => {
    const response = await UserService.userPosts({ page, userId, authorization });

    if (!response.ok) {
      if (Array.isArray(response.message)) {
        const message = response.message.reduce((prev, act) => {
          return `${prev}\n${act}.`
        }, '')
        Swal.fire(message)
      } else {
        Swal.fire(response.message)
      }
    }

    return response;
  },
);


export function fetchUserPostsBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchUserPosts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);

      if (action.payload.result.posts.length <= 0) {
        return;
      }

      state.pages.profile += 1;
      state.profile!.posts = [...state.profile!.posts, ...action.payload.result.posts];

    }).addCase(fetchUserPosts.rejected, (state, action) => {
      state.loading = false;
      state.pages.profile -= 1;
      console.log(action);
    });
}