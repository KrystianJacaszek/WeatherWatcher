import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface SelectedCountryState {
  value: string;
}

const initialState: SelectedCountryState = {
  value: "PL",
};

export const selecetdCountrySlice = createSlice({
  name: 'selectedCountry',
  initialState,
  reducers: {
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      localStorage.setItem("selectCountry", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setSelectedCountry } = selecetdCountrySlice.actions;

export const selectSelectedCountry = (state: RootState) => state.selectedCountry.value;

export default selecetdCountrySlice.reducer;
