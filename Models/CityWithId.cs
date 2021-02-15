namespace API.Models
{
    public class CityWithId
    {
        public double Id { get; set; }
        public string CityName { get; set; }

        public CityWithId(double id, string cityName)
        {
            Id = id;
            CityName = cityName;
        }
    }
}
