import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import UserService from '../../../services/User/UserService';
import { PostState } from '../../Reducers/Post';

export const fetchFollow = createAsyncThunk(
  'fetchFollow',
  async ({ followedId, authorization }: { followedId: number, authorization: string }) => {
    const response = await UserService.followUser({ followedId, authorization });

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


export function fetchFollowBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchFollow.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchFollow.fulfilled, (state, action) => {
      state.loading = false;
      state.profile!.user.isFollowing = action.payload.result.isFollowing;
      console.log(action);
    });
}