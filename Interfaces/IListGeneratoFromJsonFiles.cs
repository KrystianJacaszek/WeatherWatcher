using API.Models;

namespace API.Interfaces
{
    public interface IListGeneratoFromJsonFiles
    {
        public CoordinatesJson GetCoordinatesFromCityId(int id);
    }
}
