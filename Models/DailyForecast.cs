using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Models
{
    public class DailyForecast
    {
        public IList<ComplexCurrentWeather> ForecastList;
        public DateTime TimeStamp;

        public DailyForecast(IList<DailyForecastJson> dailyForecastJsons)
        {
            ForecastList = dailyForecastJsons.Select(df => new ComplexCurrentWeather(df)).ToList();
            TimeStamp = DateTime.Now.Date;
        }
    }
}
