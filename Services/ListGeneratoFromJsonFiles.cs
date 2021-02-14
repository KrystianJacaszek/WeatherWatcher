using API.Interfaces;
using API.Models;
using API.Models.Json;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace API.Services
{
    public class ListGeneratoFromJsonFiles : IListGeneratoFromJsonFiles
    {
        public ListGeneratoFromJsonFiles()
        {
            UpdateLists();
        }

        public Dictionary<double, CoordinatesJson> CityIdToCoordinatesDictionary
        {
            get
            {
                if(_cityIdToCoordinatesDictionary.Count != 0)
                    return _cityIdToCoordinatesDictionary;
                else
                {
                    _cityIdToCoordinatesDictionary = ReadModelsFormJsonFile();
                }
                return _cityIdToCoordinatesDictionary;
            }
        }
        private Dictionary<double, CoordinatesJson> _cityIdToCoordinatesDictionary = new Dictionary<double, CoordinatesJson>();

        public CoordinatesJson GetCoordinatesFromCityId(int id)
        {
            if (CityIdToCoordinatesDictionary.TryGetValue((double)id, out CoordinatesJson coordinates))
            {
                return coordinates;
            }
            else
                return default;
        }

        private void UpdateLists()
        {
            _cityIdToCoordinatesDictionary = ReadModelsFormJsonFile();
        }

        private Dictionary<double, CoordinatesJson> ReadModelsFormJsonFile()
        {
            Dictionary<double, CoordinatesJson> tempCityIdToCoordinatesDictionary = new Dictionary<double, CoordinatesJson>();

            foreach(string filePath in GetPaths())
            {
                using (StreamReader file = File.OpenText(filePath))
                {
                    var cityListJson = JsonConvert.DeserializeObject<IList<CityEntityJson>>(file.ReadToEnd());

                    foreach (CityEntityJson entity in cityListJson)
                    {
                        if (!tempCityIdToCoordinatesDictionary.ContainsKey(entity.Id))
                            tempCityIdToCoordinatesDictionary.Add(entity.Id, entity.Coordinates);
                    }
                }
            }
            return tempCityIdToCoordinatesDictionary;
        }

        private IList<string> GetPaths()
        {
            IList<string> paths = new List<String>();
            for(int i = 1; i<8; i++)
            {
                paths.Add(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), $@"Resources\city.list.00{i}.json"));
            }
            return paths;
        }
    }
}
