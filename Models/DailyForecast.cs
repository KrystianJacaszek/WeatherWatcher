using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class DailyForecast
    {
        [JsonProperty("dt")]
        public int DateTime;

        [JsonProperty("sunrise")]
        public int Sunrise;

        [JsonProperty("sunset")]
        public int Sunset;

        [JsonProperty("temp")]
        public Temps Temperatures;

        [JsonProperty("feels_like")]
        public FeelsLikeTemps FeelLikeTemps;

        [JsonProperty("pressure")]
        public int Pressure { get; set; }

        [JsonProperty("humidity")]
        public int Humidity { get; set; }

        [JsonProperty("dew_point")]
        public double DewPoint { get; set; }

        [JsonProperty("wind_speed")]
        public double WindSpeed { get; set; }

        [JsonProperty("wind_deg")]
        public int WindDegree { get; set; }

        [JsonProperty("weather")]
        public List<DailyForecastAdditional> AdditionalInfo { get; set; }

        [JsonProperty("clouds")]
        public int Clouds { get; set; }

        [JsonProperty("pop")]
        public double Pop { get; set; }

        [JsonProperty("uvi")]
        public double Uvi { get; set; }
    }

    public class DailyForecastAdditional
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("main")]
        public string Main { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }
    }
}
