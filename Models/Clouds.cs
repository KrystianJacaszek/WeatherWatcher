using Newtonsoft.Json;

namespace API.Models
{
    public class Clouds
    {
        //Cloudiness, %
        [JsonProperty("all")]
        public int All { get; set; }
    }
}
