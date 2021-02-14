using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
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
            return await _cacheService.GetCachedCurrentWeatherAsync(_tempCityId);
        }

        [HttpGet("complexcurrentweather")]
        public async Task<ComplexCurrentWeather> GetComplexCurrentWeatherAsync()
        {
            return await _cacheService.GetCachedComplexCurrentWeatherAsync(_tempCityId);
        }

        [HttpGet("forecast")]
        public async Task<IList<ComplexCurrentWeather>> GetWeatherForecast()
        {
            return await _cacheService.GetCachedForecastAsync(_tempCityId);
        }

        [HttpGet("airpollution")]
        public async Task<IList<AirPollutionComponents>> GetAirPolluition()
        {
            return await _cacheService.GetCachedAirPollutionWeatherAsync(_tempCityId);
        }


        [HttpGet("alerts")]
        public async Task<IList<AlertDetails>> GetWeatherAlertst()
        {
            return await _cacheService.GetCachedAlertsAsync(_tempCityId);
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
