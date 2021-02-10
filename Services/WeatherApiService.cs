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
        private string _apiKey = "068967c4584118a3a5856e3156211eec";
        private string _apiKeyPrefix = "&appid=";
        private string _currentWeatherRequest = "weather?q=";
        private string _tempCity = "london";
        private string _lon = "50";
        private string _lat = "50";

        public string GenerateAirPollutionRequestLink(double lat, double lon, DateTime startDate, DateTime endDate)
        {
            return $"air_pollution/history?lat={lat}&lon={lon}&start={DateTimeToUnixTimeStampConverter(startDate)}&end={DateTimeToUnixTimeStampConverter(endDate)}&appid={_apiKey}";
        }

        public string GenerateForecastRequestLink(string lat, string lon)
        {
            return $"onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly&appid={_apiKey}";
        }

        public string GenerateAlertsRequestLink(double lat, double lon)
        {
            return $"onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,daily&appid={_apiKey}";
        }
        public WeatherApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public long DateTimeToUnixTimeStampConverter(DateTime dateTime) => ((DateTimeOffset)dateTime).ToUnixTimeSeconds();

        public DateTime UnixTimeStampToDateTimeConverter(long unixTime) => DateTimeOffset.FromUnixTimeSeconds(unixTime).DateTime;


        public async Task<CurrentWeatherJson> GetCurrentWeatherAsync()
        {
            var response = await _httpClient.GetAsync($"{_currentWeatherRequest}{_tempCity}{_apiKeyPrefix}{_apiKey}");
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<CurrentWeatherJson>(responseBody);

            return deserializedResponse;
        }

        public async Task<AirPollutionJson> GetAirPollutionnAsync(double lon, double lat, DateTime startDate, DateTime endDate)
        {
            var response = await _httpClient.GetAsync(GenerateAirPollutionRequestLink(lat, lon, startDate, endDate));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<AirPollutionJson>(responseBody);

            return deserializedResponse;
        }

        public async Task<MainForecastJson> GetDailyForecastAsync()
        {
            var response = await _httpClient.GetAsync(GenerateForecastRequestLink(_lat, _lon));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<MainForecastJson>(responseBody);

            return deserializedResponse;
        }

        public async Task<DailyForecastJson> GetDailyForecastSingleAsync()
        {
            var x = await GetDailyForecastAsync();

            return x.DailyForecast.First();
        }

        public async Task<WeatherAlertsJson> GetWeatherAlertsAsync(double lon, double lat)
        {
            var response = await _httpClient.GetAsync(GenerateAlertsRequestLink(lat, lon));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<WeatherAlertsJson>(responseBody);

            return deserializedResponse;
        }
    }
}
