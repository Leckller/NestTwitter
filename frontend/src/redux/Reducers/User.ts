import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserTypeToken } from '../../types';

interface UserState {
  token: string;
  user: UserTypeToken;
  customColors: boolean
}

const initialState: UserState = {
  customColors: true,
  token: '',
  user: {
    id: 0,
    name: '',
    address: '',
    banner: '',
    photo: '',
    bgColor: '',
    textColor: '',
  },
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string, user: UserTypeToken }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('nUser', JSON.stringify(action.payload.user));
      localStorage.setItem('nToken', action.payload.token);
    },
    toggleCustomColors(state) {
      state.customColors = !state.customColors;
    },
  },
});

export const { setToken, toggleCustomColors } = UserSlice.actions;

export default UserSlice.reducer;
