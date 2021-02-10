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

        public CacheService(IWeatherApiService weatherApiService)
        {
            _weatherApiService = weatherApiService;
        }

        public async Task<CurrentWeather> GetCachedCurrentWeatherAsync(int cityId)
        {
            if(_currentWeather.TryGetValue(cityId, out CurrentWeather currentWeather))
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

        public async Task<CurrentWeather> UpdateCurrentWeatherCache(int cityId)
        {
            var currentWeatherFromJson = await _weatherApiService.GetCurrentWeatherAsync();

            var currentWeatherToReplace = new CurrentWeather(currentWeatherFromJson);

            return ReplaceAndRetrunIfExpiredOrMissing<CurrentWeather>(_currentWeather, cityId, currentWeatherToReplace);
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
