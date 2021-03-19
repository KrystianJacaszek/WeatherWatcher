import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import selectedCountryReducer from '../components/Slices/selectedCountrySlice';
import selectedCityReducer from '../components/Slices/selectedCitySlice';
import countryListReducer from '../components/Slices/countryListSlice';
import cityListReducer from '../components/Slices/cityListSlice';
import forecastListReducer from '../components/Slices/forecastListSlice';
import complexCurrentWeatherReducer from '../components/Slices/complexCurrentWeatherSlice';
import airPollutionListReducer from '../components/Slices/airPollutionListSlice';
import alertListReducer from '../components/Slices/alertListSlice';
import currentWeatherReducer from '../components/Slices/currentWeatherSlice';

export const store = configureStore({
  reducer: {
    selectedCountry: selectedCountryReducer,
    selectedCity: selectedCityReducer,
    countryList: countryListReducer,
    cityList: cityListReducer,
    forecastList: forecastListReducer,
    complexCurrentWeather: complexCurrentWeatherReducer,
    airPollutionList: airPollutionListReducer,
    alertList: alertListReducer,
    currentWeather: currentWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
