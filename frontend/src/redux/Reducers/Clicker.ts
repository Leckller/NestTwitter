import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Este aqui é o tipo do estado do reducer
interface ClickerState {
  clicks: number;
}

// Este aqui é o estado inicial deste reducer
const initialState: ClickerState = {
  clicks: 0,
};

export const ClickerSlice = createSlice({
  name: 'Clicker',
  initialState,
  reducers: {
    // Você pode criar suas actions em formato de função neste objeto aqui
    incClick: (state) => {
      state.clicks++;
    },
    decClick: (state) => {
      state.clicks--;
    },
    resetClick: (state) => {
      state.clicks = 0;
    },
    setClick: (state, action: PayloadAction<number>) => {
      state.clicks = action.payload;
    },
  },
});

// Exportando as actions!
export const { incClick, decClick, resetClick, setClick } = ClickerSlice.actions;

// Exportando o Reducer com padrão default!
export default ClickerSlice.reducer;
