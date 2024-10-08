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

      const body = document.querySelector('body')!;
      body.style.backgroundColor = action.payload.user.bgColor;
      body.style.color = action.payload.user.textColor;
    },
    toggleCustomColors(state) {
      state.customColors = !state.customColors;
    },
    setUserColors(state, action: PayloadAction<{ bgColor: string, textColor: string }>) {
      const { bgColor, textColor } = action.payload;
      state.user.textColor = textColor;
      state.user.bgColor = bgColor;
      localStorage.setItem('nUser', JSON.stringify(state.user));
    },
  },
});

export const { setToken, toggleCustomColors, setUserColors } = UserSlice.actions;

export default UserSlice.reducer;
