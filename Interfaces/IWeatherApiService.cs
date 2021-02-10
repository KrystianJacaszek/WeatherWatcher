using API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IWeatherApiService
    {
        Task<CurrentWeatherJson> GetCurrentWeatherAsync();
        Task<AirPollutionJson> GetAirPollutionnAsync(double lon, double lat, DateTime startDate, DateTime endDate);

        Task<MainForecastJson> GetDailyForecastAsync(double lon, double lat);

        Task<WeatherAlertsJson> GetWeatherAlertsAsync(double lon, double lat);
    }
}
