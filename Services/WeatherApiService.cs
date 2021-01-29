using API.Interfaces;
using System.Net.Http;

namespace WeatherWatcher.Services
{
    public class WeatherApiService : IWeatherApiService
    {
        private readonly HttpClient _httpClient;
        private string _apiKey = "";
        public WeatherApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
    }
}
