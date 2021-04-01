using Newtonsoft.Json;

namespace API.Models.Json
{
    public class CityEntityJson
    {
        [JsonProperty("id")]
        public double Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("state")]
        public string Sate { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("coord")]
        public CoordinatesJson Coordinates { get; set; }
    }
}
