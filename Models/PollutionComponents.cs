using Newtonsoft.Json;

namespace API.Models
{
    public class PollutionComponents
    {
        //μg/m3
        [JsonProperty("co")]
        public double Co { get; set; }

        [JsonProperty("no")]
        public double No { get; set; }

        [JsonProperty("no2")]
        public double No2 { get; set; }

        [JsonProperty("o3")]
        public double O3 { get; set; }

        [JsonProperty("so2")]
        public double So2 { get; set; }

        [JsonProperty("pm2_5")]
        public double Pm25 { get; set; }

        [JsonProperty("pm10")]
        public double Pm10 { get; set; }

        [JsonProperty("nh3")]
        public double Nh3 { get; set; }
    }
}
