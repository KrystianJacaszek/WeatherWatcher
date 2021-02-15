using API.Models;
using System.Collections.Generic;

namespace API.Interfaces
{
    public interface IListGeneratorFromJsonFiles
    {
        public CoordinatesJson GetCoordinatesFromCityId(int id);
        public Dictionary<string, string> IsoNamesToCountries { get; }
        public Dictionary<string, List<CityWithId>> IsoNamesToListOfCitiesWithId { get; }
    }
}
