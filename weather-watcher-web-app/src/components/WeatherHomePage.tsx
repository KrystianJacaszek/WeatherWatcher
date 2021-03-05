import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Form, Card, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import FormItem from 'antd/lib/form/FormItem';
import { BasicCurrentWeatherInformation } from './BasicCurrentWeatherInformation';
import { WaitingForData } from './WaitingForData';
import { AirPollution } from './AirPollution';
import { ComplexCurrentWeather } from './ComplexCurrentWeather';
import { Forecast } from './Forecast';
import { Alerts } from './Alerts';
import { fetchCountryList, selectCountryList } from './countryListSlice';
import { fetchCityList, selectCityList } from './cityListSlice';
import { fetchForecastList } from './forecastListSlice';
import { selectSelectedCountry, setSelectedCountry } from './selectedCountrySlice'
import { selectSelectedCity, setSelectedCity } from './selectedCitySlice'
import { fetchComplexCurrentWeather } from './complexCurrentWeatherSlice';
import { fetchAirPollutionList } from './airPollutionListSlice';
import { fetchCurrentWeather } from "./currentWeatherSlice";


const { Option } = Select;

const CountriesIsoNames =
    [
        "AF",
        "AL",
        "DZ",
        "AD",
        "AO",
        "AI",
        "AG",
        "AR",
        "AM",
        "AW",
        "AU",
        "AT",
        "AZ",
        "BS",
        "BH",
        "BD",
        "BB",
        "BY",
        "BE",
        "BZ",
        "BJ",
        "BM",
        "BT",
        "BA",
        "BW",
        "BV",
        "BR",
        "IO",
        "BG",
        "BF",
        "BI",
        "KH",
        "CM",
        "CA",
        "CV",
        "KY",
        "CF",
        "TD",
        "CL",
        "CN",
        "CX",
        "CO",
        "KM",
        "CK",
        "CR",
        "HR",
        "CU",
        "CY",
        "CZ",
        "DK",
        "DJ",
        "DM",
        "DO",
        "EC",
        "EG",
        "SV",
        "GQ",
        "ER",
        "EE",
        "ET",
        "FO",
        "FJ",
        "FI",
        "FR",
        "GF",
        "PF",
        "GA",
        "GM",
        "GE",
        "DE",
        "GH",
        "GI",
        "GR",
        "GL",
        "GD",
        "GP",
        "GU",
        "GT",
        "GG",
        "GN",
        "GW",
        "GY",
        "HT",
        "HM",
        "HN",
        "HK",
        "HU",
        "IS",
        "IN",
        "ID",
        "IR",
        "IQ",
        "IE",
        "IM",
        "IL",
        "IT",
        "JM",
        "JP",
        "JE",
        "JO",
        "KZ",
        "KE",
        "KI",
        "KW",
        "KG",
        "LV",
        "LB",
        "LS",
        "LR",
        "LI",
        "LT",
        "LU",
        "MO",
        "MG",
        "MW",
        "MY",
        "MV",
        "ML",
        "MT",
        "MH",
        "MQ",
        "MR",
        "MU",
        "YT",
        "MX",
        "MC",
        "MN",
        "ME",
        "MS",
        "MA",
        "MZ",
        "MM",
        "NA",
        "NR",
        "NP",
        "NL",
        "NC",
        "NZ",
        "NI",
        "NE",
        "NG",
        "NU",
        "NF",
        "MP",
        "NO",
        "OM",
        "PK",
        "PW",
        "PA",
        "PG",
        "PY",
        "PE",
        "PH",
        "PN",
        "PL",
        "PT",
        "PR",
        "QA",
        "RO",
        "RW",
        "KN",
        "LC",
        "PM",
        "VC",
        "WS",
        "SM",
        "ST",
        "SA",
        "SN",
        "RS",
        "SC",
        "SL",
        "SG",
        "SK",
        "SI",
        "SB",
        "SO",
        "ZA",
        "GS",
        "ES",
        "LK",
        "SD",
        "SR",
        "SZ",
        "SE",
        "CH",
        "TW",
        "TJ",
        "TH",
        "TG",
        "TK",
        "TO",
        "TT",
        "TN",
        "TR",
        "TM",
        "TC",
        "TV",
        "UG",
        "UA",
        "AE",
        "GB",
        "US",
        "UM",
        "UY",
        "UZ",
        "VU",
        "WF",
        "YE",
        "ZM",
        "ZW"
    ];

const menuItems = ["basic", "advanced"];

export const WeatherHomePage: React.FC = () => {
    const countryList = useSelector(selectCountryList);
    const cityList = useSelector(selectCityList);
    const selectedCountry = useSelector(selectSelectedCountry);
    const selectedCity = useSelector(selectSelectedCity);
    const dispatch = useDispatch();
    const[selectedMenuItem, setSelectedMenuItem] = useState<string>("basic");

    let selectCountry = (key: string) =>
    {
        dispatch(setSelectedCountry(key));
        dispatch(fetchCityList(key));
    }

    let selectCity = (key: number) =>
    {
        dispatch(setSelectedCity(key));
        if(selectedMenuItem != "basic")
        {
            dispatch(fetchForecastList(key));
            dispatch(fetchComplexCurrentWeather(key));
            dispatch(fetchAirPollutionList(key));
        }
        else
        {
            dispatch(fetchCurrentWeather(key));
        }
    }

    const loadItems = async () => {
        dispatch(fetchCountryList());
        dispatch(fetchCityList(selectedCountry));
    }

    const handleClickMenu = (e: any) => {
        setSelectedMenuItem(e.key);
      };

    useEffect(() => {
        var selectedCountryFromLocalStorage = localStorage.getItem("selectedCountry");
        if(selectedCountryFromLocalStorage !== undefined && selectedCountryFromLocalStorage !== null)
            dispatch(setSelectedCountry(selectedCountryFromLocalStorage));
        
        var selectedCityFromLocalStorage = localStorage.getItem("selectCity");
        if(selectedCityFromLocalStorage !== undefined && selectedCityFromLocalStorage !== null)
            dispatch(setSelectedCity(parseInt(selectedCityFromLocalStorage)));

        Promise.all([loadItems()]);
    }, []);

    return (
        <>
            <Row
                gutter={[16, 36]}
                style={{ alignItems: 'center', marginTop:30, marginBottom: 30 }}
                justify='space-around'>
                    <Col span={24}>
                        <Menu onClick={handleClickMenu} selectedKeys={[selectedMenuItem]} mode="horizontal">
                            <Menu.Item key={"basic"}>
                                Podstawowe informacje pogodowe
                            </Menu.Item>
                            <Menu.Item key={"advanced"}>
                                Szczegółowe informacje pogodowe
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            <Card style={{marginBottom: 20}}>
                <Row
                gutter={[16, 36]}
                style={{ alignItems: 'center' }}
                justify='space-around'>
                
                {countryList !=undefined ? (
                    <>
                        <Col span={6}>
                            <Form>
                                <FormItem
                                    label = 'Lista krajów'
                                >
                                    <Select style={{ width: 200 }}
                                            defaultValue={selectedCountry}
                                            value={selectedCountry}
                                            onChange={selectCountry}
                                            showSearch
                                            placeholder="Wyszukaj i wybierz"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                            >
                                                {console.log(countryList)}
                                        {CountriesIsoNames.map((isoName) => {
                                            return <Option value={isoName}>{countryList[`${isoName}`]}</Option>
                                        } )}
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                    </>
                    ) : (
                        <>
                            <Col span={6}>
                                <WaitingForData message="Proszę czekać na załadowanie listy krajów."/>
                            </Col>
                        </>
                    )}

                    {cityList != undefined ? (
                        <>
                            <Col span={6}>
                                <Form>
                                    <FormItem
                                        label = 'Lista miast'
                                    >
                                        <Select style={{ width: 200 }}
                                                defaultValue={selectedCity}
                                                value={selectedCity}
                                                onChange={selectCity}
                                                showSearch
                                                placeholder="Wyszukaj i wybierz"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                                >
                                            {cityList?.map((city) => {
                                                return <Option value={city.id}>{city.cityName}</Option>
                                            } )}
                                        </Select>
                                    </FormItem>
                                </Form>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col span={6}>
                                <WaitingForData message="Proszę czekać na załadowanie listy miast."/>
                            </Col>
                        </>
                    )}
                </Row>
            </Card>
            <Card>

                {selectedCity? (
                    <>
                        {selectedMenuItem == "basic" ? (
                            <>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                                    <Col span={24}>
                                    <h1>Podstawowe informacje pogodowe</h1>
                                    </Col>
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                                    <Col span={12}>
                                        <h3>Aktualna pogoda</h3>
                                        <BasicCurrentWeatherInformation/>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center'}}
                                    justify='center'>
                                    <Col span={24}>
                                    <h1>Szczegółowe informacje pogodowe</h1>
                                    </Col>
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center', marginTop: 30 }}
                                    justify='center'>
                                    <Col span={24}>
                                        <h3>Prognoza pogody</h3>
                                        <ComplexCurrentWeather/>
                                    </Col>
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center', marginTop: 20 }}
                                    justify='center'>
                                    <Col span={24}>
                                        <h3>Prognoza pogody na kolejne dni</h3>
                                        <Forecast/>
                                    </Col>
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center', marginTop: 30 }}
                                    justify='center'>
                                    <Col span={24}>
                                        <h3>Zanieczyszczenie powietrza</h3>
                                        <AirPollution/>
                                    </Col>
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center', marginTop: 30 }}
                                    justify='center'>
                                    <Col span={24}>
                                        <h3>Alerty pogodowe</h3>
                                        <Alerts/>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Col span={24}>
                            <WaitingForData message="Wybierz miasto..." useSpinner={false}/>
                        </Col>
                    </>
                )} 
            </Card>
        </>
    ) 
}
