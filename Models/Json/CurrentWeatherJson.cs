using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace API.Models
{
    public class CurrentWeatherJson
    {
        [JsonProperty("coord")]
        public CoordinatesJson Coordinates { get; set; }

        [JsonProperty("weather")]
        public IList<WeatherJson> Weather { get; set; }

        [JsonProperty("base")]
        public string Base { get; set; }

        [JsonProperty("main")]
        public MainWeatherParametersJson MainWeatherParameters { get; set; }

        [JsonProperty("visibility")]
        public int Visibility { get; set; }

        [JsonProperty("wind")]
        public WindJson Wind { get; set; }

        [JsonProperty("clouds")]
        public CloudsJson Clouds { get; set; }

        [JsonProperty("dt")]
        public string DataTimeUTC { get; set; }

        [JsonProperty("sys")]
        public OtherWeatherInfoJson OtherWeatherInfo { get; set; }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("timezone")]
        public int Timezone { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("cod")]
        public int InternalCod { get; set; }

    }
}
