using API.Interfaces;
using API.Models;
using API.Services;
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
        private readonly int _tempCityId = 748230;

        public WeatherWatcherController(IWeatherApiService weatherApiService, ICacheService cacheService)
        {
            _weatherApiService = weatherApiService;
            _cacheService = cacheService;
        }

        [HttpGet("currentweather")]
        public async Task<CurrentWeather> GetCurrentWeatherAsync()
        {
            var x = await _cacheService.GetCachedCurrentWeatherAsync(_tempCityId);
            return x;
        }

        [HttpGet("complexcurrentweather")]
        public async Task<ComplexCurrentWeather> GetComplexCurrentWeatherAsync()
        {
            var x = await _cacheService.GetCachedComplexCurrentWeatherAsync(_tempCityId);
            return x;
        }

        [HttpGet("forecast")]
        public async Task<IList<ComplexCurrentWeather>> GetWeatherForecast()
        {
            var x = await _cacheService.GetCachedForecastAsync(_tempCityId);
            return x;
        }

        [HttpGet("airpollution")]
        public async Task<IList<AirPollutionComponents>> GetAirPolluition()
        {
            var x = await _cacheService.GetCachedAirPollutionWeatherAsync(_tempCityId);
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

        //[HttpGet("cities")]
        //public async Task<IList<CityEntityJson> GetCityLists()
        //{
        //    return _cacheService.GetCityList();

        //    //var lon = 50;
        //    //var lat = 50;
        //    //var x = await _weatherApiService.GetWeatherAlertsAsync(lon, lat);
        //    //return x;
        //}
    }
}
