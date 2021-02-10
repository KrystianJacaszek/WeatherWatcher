using Newtonsoft.Json;

namespace API.Models
{
    public class CloudsJson
    {
        //Cloudiness, %
        [JsonProperty("all")]
        public int All { get; set; }
    }
}
