import { createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../../../services/User/register';
import { RegisterRequest } from '../../../types/User/Register.Request';

export const fetchRegister = createAsyncThunk(
  'fetchRegister',
  async (fields: RegisterRequest) => {
    const response = await register(fields);
    return response;
  },
);
