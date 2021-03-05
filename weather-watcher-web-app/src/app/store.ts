import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import selectedCountryReducer from '../components/selectedCountrySlice';
import selectedCityReducer from '../components/selectedCitySlice';
import countryListReducer from '../components/countryListSlice';
import cityListReducer from '../components/cityListSlice';
import forecastListReducer from '../components/forecastListSlice';
import complexCurrentWeatherReducer from '../components/complexCurrentWeatherSlice';
import airPollutionListReducer from '../components/airPollutionListSlice';
import alertListReducer from '../components/alertListSlice';
import currentWeatherReducer from '../components/currentWeatherSlice';

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
