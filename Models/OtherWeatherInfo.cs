using Newtonsoft.Json;
using System;

namespace API.Models
{
    public class OtherWeatherInfo
    {
        [JsonProperty("type")]
        public int Type { get; set; }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        //NeedConvert to DateTime
        [JsonProperty("sunrise")]
        public string Sunrise { get; set; }

        //NeedConvert to DateTime
        [JsonProperty("sunset")]
        public string Sunset { get; set; }
    }
}
