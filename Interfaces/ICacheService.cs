using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICacheService
    {
        Task<CurrentWeather> GetCachedCurrentWeatherAsync(int cityId);
    }
}
