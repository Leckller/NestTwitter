import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import UserService from '../../../services/User/UserService';
import { UserState } from '../../Reducers/User';

export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async ({ email, password }: { email: string, password: string }) => {
    const response = await UserService.login({ email, password });

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

export function fetchLoginBuilder(builder: ActionReducerMapBuilder<UserState>) {
  builder
    .addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = false;
      if ('error' in action.payload) {
        state.error = action.payload.message;
        return;
      }
      if (!action.payload.ok) {
        state.error = action.payload.message;
        return;
      }
      localStorage.setItem(
        'nesTwitterToken',
        JSON.stringify(action.payload.result.token),
      );
      state.token = action.payload.result.token;
    });
}