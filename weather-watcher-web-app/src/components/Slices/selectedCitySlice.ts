import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface SelectedCityState {
  value: number;
}

const initialState: SelectedCityState = {
  value: 0,
};

export const selecetdCitySlice = createSlice({
  name: 'selectedCity',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<number>) => {
      localStorage.setItem("selectCity", action.payload.toString());
      state.value = action.payload;
    },
  },
});

export const { setSelectedCity } = selecetdCitySlice.actions;

export const selectSelectedCity = (state: RootState) => state.selectedCity.value;

export default selecetdCitySlice.reducer;
