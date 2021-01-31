using API.Enums;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace API.Models
{
    public class AirPollution
    {
        [JsonProperty("coord")]
        public Coordinates Coordinates { get; set; }


        [JsonProperty("list")]
        public List<PullutionListEntity> AirPolutionComponents { get; set; }
    }

    public class PollutionMain
    {
        [JsonProperty("aqi")]
        public AirQualityIndex AirQualityIndex { get; set; }
    }

    public class PullutionListEntity
    {
        [JsonProperty("main")]
        public PollutionMain Main { get; set; }

        [JsonProperty("components")]
        public PollutionComponents PollutionComponents { get; set; }

        [JsonProperty("dt")]
        public string DateTime { get; set; }
    }
}
