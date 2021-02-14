using API.Models;
using System.Collections.Generic;

namespace API.Interfaces
{
    public interface IListGeneratoFromJsonFiles
    {
        public CoordinatesJson GetCoordinatesFromCityId(int id);
    }
}
