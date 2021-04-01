using System;
using System.Linq;

namespace API.Models
{
    public class CurrentWeather
    {
        public double Temp { get; private set; }
        public double FeelsTemp { get; private set; }
        public double Min { get; private set; }
        public double Max { get; private set; }
        public double Pressure { get; private set; }
        public string Icon { get; private set; }
        public DateTime TimeStamp { get; private set; }

        public CurrentWeather(CurrentWeatherJson currentWeatherJson)
        {
            Temp = currentWeatherJson.MainWeatherParameters.Temp;
            Min = currentWeatherJson.MainWeatherParameters.TempMin;
            Max = currentWeatherJson.MainWeatherParameters.TempMax;
            FeelsTemp = currentWeatherJson.MainWeatherParameters.FeelsLike;
            Pressure = currentWeatherJson.MainWeatherParameters.Pressure;
            Icon = currentWeatherJson.Weather.FirstOrDefault()?.Icon;
            TimeStamp = DateTime.Now.Date;
        }
    }
}
