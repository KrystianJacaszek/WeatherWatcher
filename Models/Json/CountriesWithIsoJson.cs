using Newtonsoft.Json;

namespace API.Models.Json
{
    public class CountriesWithIsoJson
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("Iso2")]
        public string Iso2 { get; set; }

        [JsonProperty("Iso3")]
        public string Iso3 { get; set; }
    }
}
