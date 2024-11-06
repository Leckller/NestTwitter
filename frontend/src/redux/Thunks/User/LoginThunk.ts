import { combineSlices, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../../services/User/login';
import Swal from 'sweetalert2';

export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async ({ email, password }: { email: string, password: string }) => {
    const response = await login({ email, password });

    if(!response.ok) {
      if(Array.isArray(response.message)) {
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
