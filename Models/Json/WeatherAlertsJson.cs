using Newtonsoft.Json;
using System.Collections.Generic;

namespace API.Models
{
    public class WeatherAlertsJson
    {
        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lon")]
        public double Lon { get; set; }

        [JsonProperty("timezone")]
        public string Timezone { get; set; }

        [JsonProperty("timezone_offset")]
        public int TimezoneOffset { get; set; }

        [JsonProperty("alerts")]
        public List<WeatherAlertJson> WeatherAlertsList { get; set; }
    }
}
