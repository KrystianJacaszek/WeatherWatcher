using API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IWeatherApiService
    {
        Task<CurrentWeatherJson> GetCurrentWeatherAsync(int cityId);
        Task<AirPollutionJson> GetAirPollutionnAsync(int cityId);

        Task<MainForecastJson> GetDailyForecastAsync(int cityId);

        Task<DailyForecastJson> GetDailyForecastSingleAsync(int cityId);

        Task<WeatherAlertsJson> GetWeatherAlertsAsync(int cityId);
    }
}
