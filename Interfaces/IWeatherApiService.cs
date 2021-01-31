using API.Models;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IWeatherApiService
    {
        Task<CurrentWeather> GetCurrentWeatherAsync();
        Task<AirPollution> GetAirPollutionnAsync(int lon, int lat, int startDate, int endDate);

        Task<MainForecast> GetDailyForecastAsync(int lon, int lat);

        Task<WeatherAlerts> GetWeatherAlertsAsync(int lon, int lat);
    }
}
