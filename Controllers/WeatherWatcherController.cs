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
        private readonly IListGeneratorFromJsonFiles _listGeneratoFromJsonFiles;
        private readonly int _tempCityId = 748230;

        public WeatherWatcherController(IWeatherApiService weatherApiService, ICacheService cacheService, IListGeneratorFromJsonFiles listGeneratoFromJsonFiles)
        {
            _weatherApiService = weatherApiService;
            _cacheService = cacheService;
            _listGeneratoFromJsonFiles = listGeneratoFromJsonFiles;
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

        [HttpGet("cieties")]
        public async Task<Dictionary<string, List<CityWithId>>> GetCitiesList()
        {
            return _listGeneratoFromJsonFiles.IsoNamesToListOfCitiesWithId;
        }

        [HttpGet("countries")]
        public async Task<Dictionary<string, string>> GetCountriesList()
        {
            return _listGeneratoFromJsonFiles.IsoNamesToCountries;
        }
    }
}