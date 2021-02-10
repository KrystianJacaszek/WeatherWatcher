using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MainForecastJson
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
        public IList<DailyForecastJson> DailyForecast { get; set; }

        [JsonProperty("alerts")]
        public IList<WeatherAlertJson> WeatherAlerts { get; set; }
    }
}
