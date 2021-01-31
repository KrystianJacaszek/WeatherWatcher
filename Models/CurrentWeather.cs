using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace API.Models
{
    public class CurrentWeather
    {
        [JsonProperty("coord")]
        public Coordinates Coordinates { get; set; }

        [JsonProperty("weather")]
        public IList<Weather> Weather { get; set; }

        [JsonProperty("base")]
        public String Base { get; set; }

        [JsonProperty("main")]
        public MainWeatherParameters MainWeatherParameters { get; set; }

        [JsonProperty("visibility")]
        public int Visibility { get; set; }

        [JsonProperty("wind")]
        public Wind Wind { get; set; }

        [JsonProperty("clouds")]
        public Clouds Clouds { get; set; }

        [JsonProperty("dt")]
        public string DataTimeUTC { get; set; }

        [JsonProperty("sys")]
        public OtherWeatherInfo OtherWeatherInfo { get; set; }

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
