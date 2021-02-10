using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherWatcherController : Controller
    {
        private readonly IWeatherApiService _weatherApiService;
        private readonly ICacheService _cacheService;

        public WeatherWatcherController(IWeatherApiService weatherApiService, ICacheService cacheService)
        {
            _weatherApiService = weatherApiService;
            _cacheService = cacheService;
        }

        [HttpGet("currentweather")]
        public async Task<CurrentWeather> GetCurrentWeatherAsync()
        {
            var x = await _cacheService.GetCachedCurrentWeatherAsync(1);
            return x;
        }

        [HttpGet("complexcurrentweather")]
        public async Task<ComplexCurrentWeather> GetComplexCurrentWeatherAsync()
        {
            var x = await _cacheService.GetCachedComplexCurrentWeatherAsync(1);
            return x;
        }

        [HttpGet("airpollution")]
        public async Task<AirPollutionJson> GetAirPolluition()
        {
            var lon = 33.441792;
            var lat = -94.037689;
            var startDate = DateTime.Now;
            var endDate = DateTime.Now.AddDays(1);
            var x = await _weatherApiService.GetAirPollutionnAsync(lon, lat, startDate, endDate);
            return x;
        }

        [HttpGet("forecast")]
        public async Task<MainForecastJson> GetWeatherForecast()
        {
            var x = await _weatherApiService.GetDailyForecastAsync();
            return x;
        }

        [HttpGet("alerts")]
        public async Task<WeatherAlertsJson> GetWeatherAlertst()
        {
            var lon = 50;
            var lat = 50;
            var x = await _weatherApiService.GetWeatherAlertsAsync(lon, lat);
            return x;
        }
    }
}
