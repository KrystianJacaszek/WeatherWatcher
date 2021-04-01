using Newtonsoft.Json;
using System.Collections.Generic;

namespace API.Models
{
    public class DailyForecastJson
    {
        [JsonProperty("dt")]
        public int DateTime { get; set; }

        [JsonProperty("sunrise")]
        public int Sunrise { get; set; }

        [JsonProperty("sunset")]
        public int Sunset { get; set; }

        [JsonProperty("temp")]
        public TempsJson Temperatures { get; set; }

        [JsonProperty("feels_like")]
        public FeelsLikeTempsJson FeelLikeTemps { get; set; }

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
        public IList<DailyForecastAdditional> AdditionalInfo { get; set; }

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
