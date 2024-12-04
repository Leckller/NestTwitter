import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import UserService from '../../../services/User/UserService';
import { PostState } from '../../Reducers/Post';

export const fetchUserLikedPosts = createAsyncThunk(
  'fetchUserLikedPosts',
  async ({ userId, authorization, page }: { page: number, userId: number, authorization: string }) => {
    const response = await UserService.userLikedPosts({ page, userId, authorization });

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


export function fetchUserLikedPostsBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchUserLikedPosts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserLikedPosts.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);

      if (action.payload.result.length <= 0) {
        state.pages.likes -= 1;
        return;
      }

      state.pages.likes += 1;
      state.profileLikes = [...state.profileLikes, ...action.payload.result];

    }).addCase(fetchUserLikedPosts.rejected, (state, action) => {
      state.loading = false;
      state.pages.likes -= 1;
      console.log(action);
    });
}