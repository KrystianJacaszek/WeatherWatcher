using API.Interfaces;
using API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public class CacheService : ICacheService
    {
        private readonly IWeatherApiService _weatherApiService;
        private Dictionary<int, CurrentWeather> _currentWeather = new Dictionary<int, CurrentWeather>();
        private Dictionary<int, ComplexCurrentWeather> _complexCurrentWeather = new Dictionary<int, ComplexCurrentWeather>();
        private Dictionary<int, DailyForecast> _dailyForecast = new Dictionary<int, DailyForecast>();
        private Dictionary<int, AirPollution> _airPolution = new Dictionary<int, AirPollution>();

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

        public async Task<IList<AirPollutionComponents>> GetCachedAirPollutionWeatherAsync(int cityId)
        {
            if (_airPolution.TryGetValue(cityId, out AirPollution airPollution))
            {
                if (IsCacheNotExpired(airPollution.TimeStamp))
                {
                    return airPollution.AirPollutionParametersList;
                }
                else
                {
                    return (await UpdateAirPollutionCache(cityId)).AirPollutionParametersList;
                }
            }
            return (await UpdateAirPollutionCache(cityId)).AirPollutionParametersList;
        }

        public async Task<IList<ComplexCurrentWeather>> GetCachedForecastAsync(int cityId)
        {
            if (_dailyForecast.TryGetValue(cityId, out DailyForecast dailyForecast))
            {
                if (IsCacheNotExpired(dailyForecast.TimeStamp))
                {
                    return dailyForecast.ForecastList;
                }
                else
                {
                    return (await UpdateDailyForecastCache(cityId)).ForecastList;
                }
            }
            return (await UpdateDailyForecastCache(cityId)).ForecastList;
        }


        public async Task<CurrentWeather> UpdateCurrentWeatherCache(int cityId)
        {
            var currentWeatherFromJson = await _weatherApiService.GetCurrentWeatherAsync(cityId);

            var currentWeatherToReplace = new CurrentWeather(currentWeatherFromJson);

            return ReplaceAndRetrunIfExpiredOrMissing<CurrentWeather>(_currentWeather, cityId, currentWeatherToReplace);
        }

        public async Task<ComplexCurrentWeather> UpdateComplexCurrentWeatherCache(int cityId)
        {
            var complexCurrentWeatherFromJson = await _weatherApiService.GetDailyForecastSingleAsync(cityId);

            var complexCurrentWeatherToReplace = new ComplexCurrentWeather(complexCurrentWeatherFromJson);

            return ReplaceAndRetrunIfExpiredOrMissing<ComplexCurrentWeather>(_complexCurrentWeather, cityId, complexCurrentWeatherToReplace);
        }

        public async Task<DailyForecast> UpdateDailyForecastCache(int cityId)
        {
            var dailyForecastFromJson = await _weatherApiService.GetDailyForecastAsync(cityId);

            var dailyForecastToReplace = new DailyForecast(dailyForecastFromJson.DailyForecast);

            return ReplaceAndRetrunIfExpiredOrMissing<DailyForecast>(_dailyForecast, cityId, dailyForecastToReplace);
        }

        public async Task<AirPollution> UpdateAirPollutionCache(int cityId)
        {
            var airPollutionFromJson = await _weatherApiService.GetAirPollutionnAsync(cityId);

            var airPollutionToReplace = new AirPollution(airPollutionFromJson);

            return ReplaceAndRetrunIfExpiredOrMissing<AirPollution>(_airPolution, cityId, airPollutionToReplace);
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
