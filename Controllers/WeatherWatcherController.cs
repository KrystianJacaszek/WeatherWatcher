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
        private readonly ICacheService _cacheService;
        private readonly IListGeneratorFromJsonFiles _listGeneratoFromJsonFiles;

        public WeatherWatcherController(ICacheService cacheService, IListGeneratorFromJsonFiles listGeneratoFromJsonFiles)
        {
            _cacheService = cacheService;
            _listGeneratoFromJsonFiles = listGeneratoFromJsonFiles;
        }

        [HttpGet("currentweather/{id}")]
        public async Task<CurrentWeather> GetCurrentWeatherAsync(int id)
        {
            return await _cacheService.GetCachedCurrentWeatherAsync(id);
        }

        [HttpGet("complexcurrentweather/{id}")]
        public async Task<ComplexCurrentWeather> GetComplexCurrentWeatherAsync(int id)
        {
            return await _cacheService.GetCachedComplexCurrentWeatherAsync(id);
        }

        [HttpGet("forecast/{id}")]
        public async Task<IList<ComplexCurrentWeather>> GetWeatherForecast(int id)
        {
            return await _cacheService.GetCachedForecastAsync(id);
        }

        [HttpGet("airpollution/{id}")]
        public async Task<IList<AirPollutionComponents>> GetAirPolluition(int id)
        {
            return await _cacheService.GetCachedAirPollutionWeatherAsync(id);
        }

        [HttpGet("alerts/{id}")]
        public async Task<IList<AlertDetails>> GetWeatherAlertst(int id)
        {
            return await _cacheService.GetCachedAlertsAsync(id);
        }

        [HttpGet("cities/{IsoName}")]
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