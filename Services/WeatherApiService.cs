using API.Interfaces;
using API.Models;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace WeatherWatcher.Services
{
    public class WeatherApiService : IWeatherApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IListGeneratoFromJsonFiles _listGeneratoFromJsonFiles;
        private string _apiKey = "068967c4584118a3a5856e3156211eec";
        private int _daysBackward = -1;

        public string GenerateAirPollutionRequestLink(CoordinatesJson coordinates, DateTime startDate, DateTime endDate)
        {
            return $"air_pollution/history?lat={coordinates.Latitude}&lon={coordinates.Longitude}&start={DateTimeToUnixTimeStampConverter(startDate)}&end={DateTimeToUnixTimeStampConverter(endDate)}&units=metric&appid={_apiKey}";
        }

        public string GenerateForecastRequestLink(CoordinatesJson coordinates)
        {
            return $"onecall?lat={coordinates.Latitude}&lon={coordinates.Latitude}&exclude=current,minutely,hourly&units=metric&appid={_apiKey}";
        }

        public string GenerateAlertsRequestLink(CoordinatesJson coordinates)
        {
            return $"onecall?lat={coordinates.Latitude}&lon={coordinates.Longitude}&exclude=current,minutely,hourly,daily&units=metric&appid={_apiKey}";
        }

        public string GenerateCurrentWeatherLink(int cityId)
        {
            return $"weather?id={cityId}&units=metric&appid={_apiKey}";
        }
        public WeatherApiService(HttpClient httpClient, IListGeneratoFromJsonFiles listGeneratoFromJsonFiles)
        {
            _httpClient = httpClient;
            _listGeneratoFromJsonFiles = listGeneratoFromJsonFiles;
    }

        public long DateTimeToUnixTimeStampConverter(DateTime dateTime) => ((DateTimeOffset)dateTime).ToUnixTimeSeconds();

        public DateTime UnixTimeStampToDateTimeConverter(long unixTime) => DateTimeOffset.FromUnixTimeSeconds(unixTime).DateTime;


        public async Task<CurrentWeatherJson> GetCurrentWeatherAsync(int cityId)
        {
            var response = await _httpClient.GetAsync(GenerateCurrentWeatherLink(cityId));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<CurrentWeatherJson>(responseBody);

            return deserializedResponse;
        }

        public async Task<AirPollutionJson> GetAirPollutionnAsync(int cityId)
        {
            var coordinates = _listGeneratoFromJsonFiles.GetCoordinatesFromCityId(cityId);
            var startDate = DateTime.Now.AddDays(_daysBackward);
            var endDate = DateTime.Now;
            var x = GenerateAirPollutionRequestLink(coordinates, startDate, endDate);
            var response = await _httpClient.GetAsync(x);
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<AirPollutionJson>(responseBody);

            return deserializedResponse;
        }

        public async Task<MainForecastJson> GetDailyForecastAsync(int cityId)
        {
            var coordinates = _listGeneratoFromJsonFiles.GetCoordinatesFromCityId(cityId);
            var response = await _httpClient.GetAsync(GenerateForecastRequestLink(coordinates));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<MainForecastJson>(responseBody);

            return deserializedResponse;
        }

        public async Task<DailyForecastJson> GetDailyForecastSingleAsync(int cityId)
        {
            var x = await GetDailyForecastAsync(cityId);
            
            return x.DailyForecast.First();
        }

        public async Task<WeatherAlertsJson> GetWeatherAlertsAsync(int cityId)
        {
            var coordinates = _listGeneratoFromJsonFiles.GetCoordinatesFromCityId(cityId);
            var response = await _httpClient.GetAsync(GenerateAlertsRequestLink(coordinates));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<WeatherAlertsJson>(responseBody);

            return deserializedResponse;
        }
    }
}
