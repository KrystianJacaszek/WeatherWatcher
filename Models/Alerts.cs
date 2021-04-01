using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Models
{
    public class Alerts
    {
        public IList<AlertDetails> WeatherAlertsList { get; set; }
        public DateTime TimeStamp { get; set;}

        public Alerts(WeatherAlertsJson weatherAlertsJson)
        {
            if (weatherAlertsJson.WeatherAlertsList == null)
                WeatherAlertsList = new List<AlertDetails>();
            else
                WeatherAlertsList = weatherAlertsJson?.WeatherAlertsList.Select(wa => new AlertDetails(wa)).ToList();
            TimeStamp = DateTime.Now.Date;
        }
    }

    public class AlertDetails
    {
        public string Event { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public string Description { get; set; }

        public AlertDetails(WeatherAlertJson weatherAlertJson)
        {
            Event = weatherAlertJson.Event;
            StartTime = weatherAlertJson.StartTime;
            EndTime = weatherAlertJson.EndTime;
            Description = weatherAlertJson.Description;
        }
}
}
