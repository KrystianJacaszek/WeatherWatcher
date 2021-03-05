import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../apiService';
import { AppThunk, RootState } from '../app/store';
import { ICityWithId } from './Interfaces/ICityWithId';

interface CityListState {
  value: ICityWithId[];
}

const initialState: CityListState = {
  value: [],
};

export const cityListSlice = createSlice({
  name: 'cityList',
  initialState,
  reducers: {
    setCityList: (state, action: PayloadAction<ICityWithId[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCityList } = cityListSlice.actions;

export const fetchCityList = (isoName: string): AppThunk => async dispatch => {
    const res = await  apiService.getCityList(isoName);
  dispatch(setCityList(res.data as ICityWithId[]));
};

export const selectCityList = (state: RootState) => state.cityList.value;

export default cityListSlice.reducer;
