import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../apiService';
import { AppThunk, RootState } from '../../app/store';
import { ICurrentWeather } from '../Interfaces/ICurrentWeather';

interface CurrentWeatherState {
  value?: ICurrentWeather;
}

const initialState: CurrentWeatherState = {
  value: undefined,
};

export const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<ICurrentWeather>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentWeather } = currentWeatherSlice.actions;

export const fetchCurrentWeather = (cityId: number): AppThunk => async dispatch => {
    const res = await  apiService.getCurrentWeather(cityId);
  dispatch(setCurrentWeather(res.data as ICurrentWeather));
};

export const selectCurrentWeather = (state: RootState) => state.currentWeather.value;

export default currentWeatherSlice.reducer;
