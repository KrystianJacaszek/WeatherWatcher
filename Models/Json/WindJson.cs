using Newtonsoft.Json;

namespace API.Models
{
    public class WindJson
    {
        [JsonProperty("speed")]
        public double Speed { get; set; }

        [JsonProperty("deg")]
        public int Degree { get; set; }
    }
}
