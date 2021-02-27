import axios from 'axios';

const BACKEND_URL = "http://localhost:63559"

const apiClient = axios.create({
    baseURL: `${BACKEND_URL}/weatherwatcher`,
    timeout: 10000,
  });

  export const apiService = {
      getCountryList: async() => {
          return apiClient.get('/countries')
      },
      getCityList: async(isoName: string) => {
          return apiClient.get(`/cities?IsoName=${isoName}`);
      },
      getCurrentWeather: async(cityId: number) => {
          return apiClient.get(`/currentweather?id=${cityId}`);
      }
  }


  