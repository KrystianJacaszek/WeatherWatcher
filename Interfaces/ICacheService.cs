using API.Models;
using API.Models.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICacheService
    {
        Task<CurrentWeather> GetCachedCurrentWeatherAsync(int cityId);
        Task<ComplexCurrentWeather> GetCachedComplexCurrentWeatherAsync(int cityId);
        Task<IList<ComplexCurrentWeather>> GetCachedForecastAsync(int cityId);
        Task<IList<AirPollutionComponents>> GetCachedAirPollutionWeatherAsync(int cityId);
    }
}
