import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from '../Thunks/LoginThunk';

interface UserState {
  token: string,
  loading: boolean,
}

const initialState: UserState = {
  token: '',
  loading: false,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.loading = true;
    }).addCase(fetchLogin.fulfilled, (state, action) => {
    });
  },
});

// export const { } = UserSlice.actions;

export default UserSlice.reducer;
