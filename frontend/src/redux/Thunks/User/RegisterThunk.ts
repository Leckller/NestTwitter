import { createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../../../services/User/register';
import { RegisterRequest } from '../../../types/User/Register.Request';
import Swal from 'sweetalert2';

export const fetchRegister = createAsyncThunk(
  'fetchRegister',
  async (fields: RegisterRequest) => {
    const response = await register(fields);

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
