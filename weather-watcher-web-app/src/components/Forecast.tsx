import { Row, Col, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { ComplexCurrentWeatherPartial } from "./ComplexCurrentWeatherPartial";
import { getDateStringFromDate, unixTimeStampToDateString } from "./Helpers/DateConverters";
import { ITemps } from "./Interfaces/ITemps";
import { WaitingForData } from "./WaitingForData";
import { selectSelectedCity, setSelectedCity } from './selectedCitySlice'
import { fetchForecastList, selectForecastList } from './forecastListSlice';
import { useDispatch, useSelector } from "react-redux";

const columns = [
    {
        title: 'Dzień',
        dataIndex: 'unixDateTime',
        key: 'unixDateTime',
        render: (key?: number) => (
            <>
                {getDateStringFromDate(unixTimeStampToDateString(key))}
            </>
        )
    },
    {
        title: 'day',
        dataIndex: 'temps',
        key: 'temps.day',
        render: (key?: ITemps) => (
            <>
                {key?.day}<sup>o</sup>C
            </>
        )
      },
      {
        title: 'night',
        dataIndex: 'temps',
        key: 'temps.night',
        render: (key?: ITemps) => (
            <>
                {key?.night}<sup>o</sup>C
            </>
        )
      },
      {
        title: 'pressure',
        dataIndex: 'pressure',
        key: 'pressure',
        render: (key?: number) => (
            <>
                {key+"hPa"}
            </>
        )
      },
      {
        title: 'Zachmurzenie',
        dataIndex: 'clouds',
        key: 'clouds',
        render: (key?: number) => (
            <>
                {key+"%"}
            </>
        )
      }
]

export const Forecast: React.FC = () => {
    const cityId = useSelector(selectSelectedCity);
    const forecast = useSelector(selectForecastList);
    const dispatch = useDispatch();
    const[currentIndex, setCurrentIndex] = useState<number>(0);
    
    useEffect(()=>{
        dispatch(fetchForecastList(cityId));
    },[])

    const handleChangeCurrentForecast = (e:any) =>{
        console.log("E target");
        console.log(e);
        if (forecast != undefined)
            setCurrentIndex(e.target.value);
    }

    return(
        <>
            { forecast? (
                <>
                    <Row
                            gutter={[16, 48]}
                            style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}
                            justify='center'>
                        <Col style={{marginTop: 10, marginBottom:10 }}
                        >
                            <Radio.Group value={currentIndex} onChange={handleChangeCurrentForecast}>
                                {forecast.map((f, index) => {
                                    return <Radio.Button value={index}>{getDateStringFromDate(unixTimeStampToDateString(f.unixDateTime))}</Radio.Button>
                                })}
                            </Radio.Group>
                        </Col>
                    </Row>
                    <ComplexCurrentWeatherPartial complexCurrentWeather={forecast[currentIndex]}/>
                </>
            ) : (
               <>
                    <WaitingForData message="Trwa ładowanie prognozy pogody na najbliższe dni"/>
               </>
            )}
        </>
    )
}