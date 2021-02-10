using API.Interfaces;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class CacheService : ICacheService
    {
        private readonly IWeatherApiService _weatherApiService;
        private Dictionary<int, CurrentWeather> _currentWeather = new Dictionary<int, CurrentWeather>();
        private Dictionary<int, ComplexCurrentWeather> _complexCurrentWeather = new Dictionary<int, ComplexCurrentWeather>();

        public CacheService(IWeatherApiService weatherApiService)
        {
            _weatherApiService = weatherApiService;
        }

        public async Task<CurrentWeather> GetCachedCurrentWeatherAsync(int cityId)
        {
            if (_currentWeather.TryGetValue(cityId, out CurrentWeather currentWeather))
            {
                if (IsCacheNotExpired(currentWeather.TimeStamp))
                {
                    return currentWeather;
                }
                else
                {
                    return await UpdateCurrentWeatherCache(cityId);
                }
            }
            return await UpdateCurrentWeatherCache(cityId);
        }

        public async Task<ComplexCurrentWeather> GetCachedComplexCurrentWeatherAsync(int cityId)
        {
            if (_complexCurrentWeather.TryGetValue(cityId, out ComplexCurrentWeather complexCurrentWeather))
            {
                if (IsCacheNotExpired(complexCurrentWeather.TimeStamp))
                {
                    return complexCurrentWeather;
                }
                else
                {
                    return await UpdateComplexCurrentWeatherCache(cityId);
                }
            }
            return await UpdateComplexCurrentWeatherCache(cityId);
        }

        public async Task<CurrentWeather> UpdateCurrentWeatherCache(int cityId)
        {
            var currentWeatherFromJson = await _weatherApiService.GetCurrentWeatherAsync();

            var currentWeatherToReplace = new CurrentWeather(currentWeatherFromJson);

            return ReplaceAndRetrunIfExpiredOrMissing<CurrentWeather>(_currentWeather, cityId, currentWeatherToReplace);
        }

        public async Task<ComplexCurrentWeather> UpdateComplexCurrentWeatherCache(int cityId)
        {
            var complexCurrentWeatherFromJson = await _weatherApiService.GetDailyForecastSingleAsync();

            var complexCurrentWeatherToReplace = new ComplexCurrentWeather(complexCurrentWeatherFromJson);

            return ReplaceAndRetrunIfExpiredOrMissing<ComplexCurrentWeather>(_complexCurrentWeather, cityId, complexCurrentWeatherToReplace);
        }

        private T ReplaceAndRetrunIfExpiredOrMissing<T>(IDictionary<int, T> cachedData, int entityId, T dataToReplace)
        {
            if (cachedData.ContainsKey(entityId))
                cachedData[entityId] = dataToReplace;
            else
                cachedData.Add(entityId, dataToReplace);

            return dataToReplace;
        }

        private bool IsCacheNotExpired(DateTime dateTime)
        {
            var currentDate = DateTime.Now;
            return currentDate.Date == dateTime.Date;
        }
    }
}
