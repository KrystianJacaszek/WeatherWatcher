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
        public async Task<ActionResult<CurrentWeather>> GetCurrentWeatherAsync(int id)
        {
            try
            {
                return Ok(await _cacheService.GetCachedCurrentWeatherAsync(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("complexcurrentweather/{id}")]
        public async Task<ActionResult<ComplexCurrentWeather>> GetComplexCurrentWeatherAsync(int id)
        {
            try
            {
                return Ok(await _cacheService.GetCachedComplexCurrentWeatherAsync(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("forecast/{id}")]
        public async Task<ActionResult<IList<ComplexCurrentWeather>>> GetWeatherForecast(int id)
        {
            try
            {
                return Ok(await _cacheService.GetCachedForecastAsync(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("airpollution/{id}")]
        public async Task<ActionResult<IList<AirPollutionComponents>>> GetAirPolluition(int id)
        {
            try
            {
                return Ok(await _cacheService.GetCachedAirPollutionWeatherAsync(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("alerts/{id}")]
        public async Task<ActionResult<IList<AlertDetails>>> GetWeatherAlertst(int id)
        {
            try
            {
                return Ok(await _cacheService.GetCachedAlertsAsync(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("cities/{IsoName}")]
        public ActionResult<List<CityWithId>> GetCitiesList(string IsoName)
        {
            try
            {
                return Ok(_listGeneratoFromJsonFiles.IsoNamesToListOfCitiesWithId[IsoName]);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("countries")]
        public ActionResult<Dictionary<string, string>> GetCountriesList()
        {
            try
            {
                return Ok(_listGeneratoFromJsonFiles.IsoNamesToCountries);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}