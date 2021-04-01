import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../apiService';
import { AppThunk, RootState } from '../../app/store';
import { IComplexCurrentWeather } from '../Interfaces/IComplexCurrentWeather';

interface ComplexCurrentWeatherState {
  value?: IComplexCurrentWeather;
}

const initialState: ComplexCurrentWeatherState = {
  value: undefined
};

export const complexCurrentWeatherSlice = createSlice({
  name: 'complexCurrentWeather',
  initialState,
  reducers: {
    setComplexCurrentWeather: (state, action: PayloadAction<IComplexCurrentWeather>) => {
      state.value = action.payload;
    },
  },
});

export const { setComplexCurrentWeather } = complexCurrentWeatherSlice.actions;

export const fetchComplexCurrentWeather = (cityId: number): AppThunk => async dispatch => {
    const res = await  apiService.getComplexCurrentWeather(cityId);
  dispatch(setComplexCurrentWeather(res.data as IComplexCurrentWeather));
};

export const selectComplexCurrentWeather = (state: RootState) => state.complexCurrentWeather.value;

export default complexCurrentWeatherSlice.reducer;
