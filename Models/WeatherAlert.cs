using Newtonsoft.Json;

namespace API.Models
{
    public class WeatherAlert
    {
        [JsonProperty("sender_name")]
        public string SenderName { get; set; }

        [JsonProperty("event")]
        public string Event { get; set; }

        [JsonProperty("start")]
        public int StartTime { get; set; }

        [JsonProperty("end")]
        public int EndTime { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}
