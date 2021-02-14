using API.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Models
{
    public class AirPollution
    {
        public IList<AirPollutionComponents> AirPollutionParametersList { get; set; }
        public DateTime TimeStamp { get; set; }

        public AirPollution(AirPollutionJson airPollutionJson)
        {
            AirPollutionParametersList = airPollutionJson.AirPolutionComponents.Select(apc => new AirPollutionComponents(apc)).ToList();
            TimeStamp = DateTime.Now.Date;
        }
    }

    public class AirPollutionComponents
    {
        public AirQualityIndex AirQualityIndex { get; set; }
        public double Co { get; set; }
        public double No { get; set; }
        public double No2 { get; set; }
        public double O3 { get; set; }
        public double So2 { get; set; }
        public double Pm25 { get; set; }
        public double Pm10 { get; set; }
        public double Nh3 { get; set; }
        public DateTime Date { get; set; }

        public AirPollutionComponents(PullutionListEntity pullutionListEntity)
        {
            AirQualityIndex = pullutionListEntity.Main.AirQualityIndex;
            Co = pullutionListEntity.PollutionComponents.Co;
            No = pullutionListEntity.PollutionComponents.No;
            No2 = pullutionListEntity.PollutionComponents.No2;
            O3 = pullutionListEntity.PollutionComponents.O3;
            So2 = pullutionListEntity.PollutionComponents.So2;
            Pm25 = pullutionListEntity.PollutionComponents.Pm25;
            Pm10 = pullutionListEntity.PollutionComponents.Pm10;
            Nh3 = pullutionListEntity.PollutionComponents.Nh3;
            Date = DateTimeOffset.FromUnixTimeSeconds(long.Parse(pullutionListEntity.DateTime)).DateTime;
        }
    }
}
