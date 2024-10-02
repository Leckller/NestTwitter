import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types';

interface UserState extends Omit<Partial<UserType>, 'password'> {
  token: string;
}

const initialState: UserState = {
  token: '',
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('nToken', action.payload);
    },
  },
});

export const { setToken } = UserSlice.actions;

export default UserSlice.reducer;
