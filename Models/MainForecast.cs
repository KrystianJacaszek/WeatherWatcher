using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MainForecast
    {
        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lon")]
        public double Lon { get; set; }

        [JsonProperty("timezone")]
        public string Timezone { get; set; }

        [JsonProperty("timezone_offset")]
        public int TimezoneOffset { get; set; }

        [JsonProperty("daily")]
        public List<DailyForecast> DailyForecast { get; set; }

        [JsonProperty("alerts")]
        public List<WeatherAlert> WeatherAlerts { get; set; }
    }
}
