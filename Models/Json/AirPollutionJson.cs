using API.Enums;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace API.Models
{
    public class AirPollutionJson
    {
        [JsonProperty("coord")]
        public CoordinatesJson Coordinates { get; set; }


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
        public PollutionComponentsJson PollutionComponents { get; set; }

        [JsonProperty("dt")]
        public string DateTime { get; set; }
    }
}
