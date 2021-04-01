using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICacheService
    {
        Task<CurrentWeather> GetCachedCurrentWeatherAsync(int cityId);
        Task<ComplexCurrentWeather> GetCachedComplexCurrentWeatherAsync(int cityId);
        Task<IList<ComplexCurrentWeather>> GetCachedForecastAsync(int cityId);
        Task<IList<AirPollutionComponents>> GetCachedAirPollutionWeatherAsync(int cityId);
        Task<IList<AlertDetails>> GetCachedAlertsAsync(int cityId);
    }
}
