import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Form, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { apiService } from '../apiService';
import FormItem from 'antd/lib/form/FormItem';
import { BasicCurrentWeatherInformation } from './BasicCurrentWeatherInformation';
import { WaitingForData } from './WaitingForData';

const { Option } = Select;

export interface CityWithId {
    id:number,
    cityName: string
}

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

export const WeatherHomePage: React.FC = () => {
    const[selectedCountry, setSelectedCountry] = useState<string>("PL");
    const[selectedCity, setSelectedCity] = useState<number>();
    const[countryList, setCountryList] = useState<{[key: string]: string}>();
    const[cityList, setCityList] = useState<CityWithId[]>();

    let getCountryList = () => {
        return apiService.getCountryList().then((res) =>{
            return res.data as {[key: string]: string}
        })
    };

    let getCityList = (isoName: string) => {
        return apiService.getCityList(isoName).then((res) =>{
            return res.data as CityWithId[]
        })
    }

    let selectCountry = (key: string) =>
    {
        setSelectedCountry(key);
        getCityList(key).then((res) => {
            setCityList(res);
        });
    }

    let selectCity = (key: number) =>
    {
        setSelectedCity(key);
    }

    const loadItems = async () => {
        const getCountryListData = await getCountryList();
        setCountryList(getCountryListData);

        const getCityListData = await getCityList(selectedCountry);
        setCityList(getCityListData);
    }

    useEffect(() => {
        Promise.all([loadItems()]);
    }, []);

    return (
        <>
            <Row
            gutter={[16, 36]}
            style={{ alignItems: 'center' }}
            justify='center'>
                <Col span={24}>
                <h1>Podstawowe informacje pogodowe</h1>
                </Col>
            </Row>
            <Card>
                <Row
                gutter={[16, 36]}
                style={{ alignItems: 'center' }}
                justify='space-around'>
                
                {countryList !=undefined ? (
                    <>
                        {console.log("countryList != undefined ")}
                        {console.log(countryList)}
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
                <Row
                    gutter={[16, 36]}
                    style={{ alignItems: 'center' }}
                    justify='center'>
                {selectedCity? (
                    <>
                        <Col span={12}>
                            <h3>Aktualna pogoda</h3>
                            <BasicCurrentWeatherInformation cityId={selectedCity}/>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col span={24}>
                            <WaitingForData message="Wybierz miasto..." useSpinner={false}/>
                        </Col>
                    </>
                )} 
                </Row>
            </Card>
        </>
    ) 
}
