using Newtonsoft.Json;

namespace API.Models
{
    public class Wind
    {
        [JsonProperty("speed")]
        public double Speed { get; set; }

        //Wind direction
        [JsonProperty("deg")]
        public int Degree { get; set; }
    }
}
