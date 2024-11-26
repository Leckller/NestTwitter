import { createSlice } from '@reduxjs/toolkit';
import { fetchLoginBuilder } from '../Thunks/User/LoginThunk';
import { fetchRegisterBuilder } from '../Thunks/User/RegisterThunk';
import { fetchFollowBuilder } from '../Thunks/User/FollowThunk';

export interface UserState {
  token: string,
  loading: boolean,
  error: any
}

const initialState: UserState = {
  token: JSON.parse(localStorage.getItem('nesTwitterToken')!) || '',
  loading: false,
  error: undefined,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    fetchLoginBuilder(builder);
    fetchRegisterBuilder(builder);
    fetchFollowBuilder(builder);
  },
});

// export const { } = UserSlice.actions;

export default UserSlice.reducer;
