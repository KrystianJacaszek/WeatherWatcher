using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherWatcherController : Controller
    {
        private readonly IWeatherApiService _weatherApiService;

        public WeatherWatcherController(IWeatherApiService weatherApiService)
        {
            _weatherApiService = weatherApiService;
        }

        [HttpGet("currentweather")]
        public async Task<CurrentWeather> GetCurrentWeather()
        {
            return await _weatherApiService.GetCurrentWeatherAsync();
        }

        [HttpGet("airpollution")]
        public async Task<AirPollution> GetAirPolluition()
        {
            var lon = 50;
            var lat = 50;
            int startDate = 1606223802;
            int endDate = 1606482999;
            var x = await _weatherApiService.GetAirPollutionnAsync(lon, lat, startDate, endDate);
            return x;
        }

        [HttpGet("forecast")]
        public async Task<MainForecast> GetWeatherForecast()
        {
            var lon = 50;
            var lat = 50;
            var x = await _weatherApiService.GetDailyForecastAsync(lon, lat);
            return x;
        }

        [HttpGet("alerts")]
        public async Task<WeatherAlerts> GetWeatherAlertst()
        {
            var lon = 50;
            var lat = 50;
            var x = await _weatherApiService.GetWeatherAlertsAsync(lon, lat);
            return x;
        }
    }
}
