using API.Interfaces;
using API.Models;
using Newtonsoft.Json;
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

        public string GenerateAirPollutionRequestLink(int lat, int lon, int startDate, int endDate)
        {
            return $"air_pollution/history?lat={lat}&lon={lon}&start={startDate}&end={endDate}&appid={_apiKey}";
        }

        public string GenerateForecastRequestLink(int lat, int lon)
        {
            return $"onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly&appid={_apiKey}";
        }

        public string GenerateAlertsRequestLink(int lat, int lon)
        {
            return $"onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,daily&appid={_apiKey}";
        }

        public WeatherApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CurrentWeather> GetCurrentWeatherAsync()
        {
            var response = await _httpClient.GetAsync($"{_currentWeatherRequest}{_tempCity}{_apiKeyPrefix}{_apiKey}");
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<CurrentWeather>(responseBody);

            return deserializedResponse;
        }

        public async Task<AirPollution> GetAirPollutionnAsync(int lon, int lat, int startDate, int endDate)
        {
            var response = await _httpClient.GetAsync(GenerateAirPollutionRequestLink(lat, lon, startDate, endDate));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<AirPollution>(responseBody);

            return deserializedResponse;
        }

        public async Task<MainForecast> GetDailyForecastAsync(int lon, int lat)
        {
            var response = await _httpClient.GetAsync(GenerateForecastRequestLink(lat, lon));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<MainForecast>(responseBody);

            return deserializedResponse;
        }

        public async Task<WeatherAlerts> GetWeatherAlertsAsync(int lon, int lat)
        {
            var response = await _httpClient.GetAsync(GenerateAlertsRequestLink(lat, lon));
            response.EnsureSuccessStatusCode();

            var responseBody = response.Content.ReadAsStringAsync().Result;

            var deserializedResponse = JsonConvert.DeserializeObject<WeatherAlerts>(responseBody);

            return deserializedResponse;
        }
    }
}
