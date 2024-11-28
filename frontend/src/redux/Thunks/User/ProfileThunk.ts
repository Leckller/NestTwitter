import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import UserService from '../../../services/User/UserService';
import { PostState } from '../../Reducers/Post';

export const fetchProfile = createAsyncThunk(
  'fetchProfile',
  async ({ userId, authorization }: { userId: number, authorization: string }) => {
    const response = await UserService.profile({ userId, authorization });

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


export function fetchProfileBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.result;
      console.log(action);
    });
}