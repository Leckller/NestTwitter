import { createSlice } from '@reduxjs/toolkit';
import { fetchLoginBuilder } from '../Thunks/User/LoginThunk';
import { fetchRegisterBuilder } from '../Thunks/User/RegisterThunk';

export interface UserState {
  token: string,
  loading: boolean,
  error: any,
  userId: number | undefined,
}

const initialState: UserState = {
  token: JSON.parse(localStorage.getItem('nesTwitterToken')!).token || '',
  loading: false,
  error: undefined,
  userId: JSON.parse(localStorage.getItem('nesTwitterToken')!).userId || '',
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    logout(state) {
      state.token = '';
      state.userId = 0;
    }
  },
  extraReducers: (builder) => {
    fetchLoginBuilder(builder);
    fetchRegisterBuilder(builder);
  },
});

export const { logout } = UserSlice.actions;

export default UserSlice.reducer;
