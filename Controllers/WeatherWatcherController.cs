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

        public WeatherWatcherController(IWeatherApiService weatherApiService, ICacheService cacheService, IListGeneratorFromJsonFiles listGeneratoFromJsonFiles)
        {
            _weatherApiService = weatherApiService;
            _cacheService = cacheService;
            _listGeneratoFromJsonFiles = listGeneratoFromJsonFiles;
        }

        [HttpGet("currentweather")]
        public async Task<CurrentWeather> GetCurrentWeatherAsync(int id)
        {
            return await _cacheService.GetCachedCurrentWeatherAsync(id);
        }

        [HttpGet("complexcurrentweather")]
        public async Task<ComplexCurrentWeather> GetComplexCurrentWeatherAsync(int id)
        {
            return await _cacheService.GetCachedComplexCurrentWeatherAsync(id);
        }

        [HttpGet("forecast")]
        public async Task<IList<ComplexCurrentWeather>> GetWeatherForecast(int id)
        {
            return await _cacheService.GetCachedForecastAsync(id);
        }

        [HttpGet("airpollution")]
        public async Task<IList<AirPollutionComponents>> GetAirPolluition(int id)
        {
            return await _cacheService.GetCachedAirPollutionWeatherAsync(id);
        }

        [HttpGet("alerts")]
        public async Task<IList<AlertDetails>> GetWeatherAlertst(int id)
        {
            return await _cacheService.GetCachedAlertsAsync(id);
        }

        [HttpGet("cities")]
        public List<CityWithId> GetCitiesList(string IsoName)
        {
            return _listGeneratoFromJsonFiles.IsoNamesToListOfCitiesWithId[IsoName];
        }

        [HttpGet("countries")]
        public Dictionary<string, string> GetCountriesList()
        {
            return _listGeneratoFromJsonFiles.IsoNamesToCountries;
        }
    }
}