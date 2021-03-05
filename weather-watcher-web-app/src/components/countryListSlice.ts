import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../apiService';
import { AppThunk, RootState } from '../app/store';

interface CountryListState {
  value: {[key: string]: string};
}

const initialState: CountryListState = {
  value: {},
};

export const countryListSlice = createSlice({
  name: 'countryList',
  initialState,
  reducers: {
    setCountryList: (state, action: PayloadAction<{[key: string]: string}>) => {
      state.value = action.payload;
    },
  },
});

export const { setCountryList } = countryListSlice.actions;

export const fetchCountryList = (): AppThunk => async dispatch => {
    const res = await apiService.getCountryList();
  dispatch(setCountryList(res.data as { [key: string]: string; }));
};

export const selectCountryList = (state: RootState) => state.countryList.value;

export default countryListSlice.reducer;
