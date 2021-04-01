import axios from 'axios';

const apiClient = axios.create({
    baseURL: `/weatherwatcher`,
    timeout: 10000,
  });

  export const apiService = {
      getCountryList: async() => {
          return apiClient.get('/countries')
      },
      getCityList: async(isoName: string) => {
          return apiClient.get(`/cities/${isoName}`);
      },
      getCurrentWeather: async(cityId: number) => {
          return apiClient.get(`/currentweather/${cityId}`);
      },
      getAirPollution: async(cityId: number) => {
          return apiClient.get(`airpollution/${cityId}`);
      },
      getComplexCurrentWeather: async(cityId: number) => {
          return apiClient.get(`complexcurrentweather/${cityId}`);
      },
      getForecast: async(cityId: number) => {
        return apiClient.get(`/forecast/${cityId}`);
      },
      getAlerts: async(cityId: number) => {
        return apiClient.get(`/alerts/${cityId}`);
    }
  }


  