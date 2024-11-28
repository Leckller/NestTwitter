import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterRequest } from '../../../types/User/Register.Request';
import Swal from 'sweetalert2';
import UserService from '../../../services/User/UserService';
import { UserState } from '../../Reducers/User';

export const fetchRegister = createAsyncThunk(
  'fetchRegister',
  async (fields: RegisterRequest) => {
    const response = await UserService.register(fields);

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

export function fetchRegisterBuilder(builder: ActionReducerMapBuilder<UserState>) {
  builder
    .addCase(fetchRegister.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchRegister.fulfilled, (state, action) => {
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
        JSON.stringify({
          token: action.payload.result.token,
          userId: action.payload.result.userId
        }),
      );
      state.token = action.payload.result.token;
      state.userId = action.payload.result.userId;
    });
}