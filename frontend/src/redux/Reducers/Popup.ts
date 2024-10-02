import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  visible: boolean;
  name: string;
}

const initialState: PopupState = {
  visible: false,
  name: '',
};

export const PopupSlice = createSlice({
  name: 'Popup',
  initialState,
  reducers: {
    toggleVisible(state) {
      state.visible = !state.visible;
    },
    setPopupType(state, action: PayloadAction<{
      name: string, id?: number }>) {
      state.name = action.payload.name;
    },
  },
});

export const { toggleVisible, setPopupType } = PopupSlice.actions;

export default PopupSlice.reducer;
