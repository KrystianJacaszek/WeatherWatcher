import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../apiService';
import { AppThunk, RootState } from '../app/store';
import { IComplexCurrentWeather } from './Interfaces/IComplexCurrentWeather';

interface ForecastListState {
  value: IComplexCurrentWeather[];
}

const initialState: ForecastListState = {
  value: [],
};

export const forecastListSlice = createSlice({
  name: 'forecastList',
  initialState,
  reducers: {
    setForecastList: (state, action: PayloadAction<IComplexCurrentWeather[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setForecastList } = forecastListSlice.actions;

export const fetchForecastList = (cityId: number): AppThunk => async dispatch => {
    const res = await  apiService.getForecast(cityId);
  dispatch(setForecastList(res.data as IComplexCurrentWeather[]));
};

export const selectForecastList = (state: RootState) => state.forecastList.value;

export default forecastListSlice.reducer;
