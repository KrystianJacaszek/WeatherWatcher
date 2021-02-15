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
    public class ListGeneratorFromJsonFiles : IListGeneratorFromJsonFiles
    {
        private Dictionary<double, CoordinatesJson> _cityIdToCoordinatesDictionary = new Dictionary<double, CoordinatesJson>();
        private Dictionary<string, string> _IsoNamesToCountries = new Dictionary<string, string>();
        private Dictionary<string, List<CityWithId>> _IsoNamesToListOfCities = new Dictionary<string, List<CityWithId>>();

        public ListGeneratorFromJsonFiles()
        {
            UpdateLists();
        }

        public Dictionary<double, CoordinatesJson> CityIdToCoordinatesDictionary
        {
            get
            {
                if (_cityIdToCoordinatesDictionary.Count != 0)
                    return _cityIdToCoordinatesDictionary;
                else
                {
                    _cityIdToCoordinatesDictionary = ReadModelsFormJsonFile();
                }
                return _cityIdToCoordinatesDictionary;
            }
        }

        public Dictionary<string, string> IsoNamesToCountries
        {
            get
            {
                if (_IsoNamesToCountries.Count != 0)
                    return _IsoNamesToCountries;
                else
                {
                    _IsoNamesToCountries = ReadCountriesWithIsoNames();
                }
                return _IsoNamesToCountries;
            }
        }

        public Dictionary<string, List<CityWithId>> IsoNamesToListOfCitiesWithId
        {
            get
            {
                if (_IsoNamesToCountries.Count != 0)
                    return _IsoNamesToListOfCities;
                else
                {
                    _IsoNamesToListOfCities = ReadCountiresWithIsoToCityWithIdList();
                }
                return _IsoNamesToListOfCities;
            }
        }


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
            _IsoNamesToCountries = ReadCountriesWithIsoNames();
            _IsoNamesToListOfCities = ReadCountiresWithIsoToCityWithIdList();
        }

        private Dictionary<string, List<CityWithId>> ReadCountiresWithIsoToCityWithIdList()
        {
            var tempDictionary = new Dictionary<string, List<CityWithId>>();

            foreach (string filePath in GetPaths())
            {
                using (StreamReader file = File.OpenText(filePath))
                {
                    var cityListJson = JsonConvert.DeserializeObject<IList<CityEntityJson>>(file.ReadToEnd());

                    foreach (CityEntityJson entity in cityListJson)
                    {
                        if (!tempDictionary.ContainsKey(entity.Country))
                        {
                            tempDictionary.Add(entity.Name, new List<CityWithId> { new CityWithId(entity.Id, entity.Name) });
                        }
                        else
                        {
                            tempDictionary[entity.Country].Add(new CityWithId(entity.Id, entity.Name));
                        }
                    }
                }
            }
            return tempDictionary;
        }

        private Dictionary<string, string> ReadCountriesWithIsoNames()
        {
            var filePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), $@"Resources\CountriesWithIso2.json");
            Dictionary<string, string> tempCountriesToIso2Name = new Dictionary<string, string>();

            using (StreamReader file = File.OpenText(filePath))
                {
                    var countriesList = JsonConvert.DeserializeObject<IList<CountriesWithIsoJson>>(file.ReadToEnd());

                    foreach (CountriesWithIsoJson entity in countriesList)
                    {
                        if (!tempCountriesToIso2Name.ContainsKey(entity.Iso2))
                        tempCountriesToIso2Name.Add(entity.Iso2, entity.Name);
                    }
                }
            return tempCountriesToIso2Name;
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
