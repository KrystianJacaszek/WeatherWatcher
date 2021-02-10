using System;
using System.Linq;

namespace API.Models
{
    public class ComplexCurrentWeather
    {
        public TempsJson Temps { get; private set; }
        public FeelsLikeTempsJson FeelTemps { get; private set; }
        public WindJson Wind { get; private set; }
        public double Pressure { get; private set; }
        public double Humidity { get; private set; }
        public DailyForecastAdditional AdditionalInfo { get; private set; }
        public int Sunrise { get; private set; }
        public int SunSet { get; private set; }
        public int Clouds { get; private set; }
        public double Uvi { get; private set; }
        public DateTime TimeStamp { get; private set; }

        public ComplexCurrentWeather(DailyForecastJson dailyForecastJson)
        {
            Temps = dailyForecastJson.Temperatures;
            FeelTemps = dailyForecastJson.FeelLikeTemps;
            Wind = new WindJson
            {
                Degree = dailyForecastJson.WindDegree,
                Speed = dailyForecastJson.WindSpeed
            };
            Pressure = dailyForecastJson.Pressure;
            Humidity = dailyForecastJson.Humidity;
            AdditionalInfo = dailyForecastJson.AdditionalInfo.FirstOrDefault();
            Sunrise = dailyForecastJson.Sunrise;
            SunSet = dailyForecastJson.Sunset;
            Clouds = dailyForecastJson.Clouds;
            Uvi = dailyForecastJson.Uvi;
            TimeStamp = DateTime.Now.Date;
        }
    }
}
