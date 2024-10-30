import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../services/login';

export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async ({ email, password }: { email: string, password: string }) => {
    const response = await login(email, password);
    return response;
  },
);
