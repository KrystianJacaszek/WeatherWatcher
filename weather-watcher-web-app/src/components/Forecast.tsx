import { Row, Col, Table, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { apiService } from "../apiService";
import { ComplexCurrentWeatherPartial } from "./ComplexCurrentWeatherPartial";
import { IComplexCurrentWeather } from "./Interfaces/IComplexCurrentWeather";
import { ITemps } from "./Interfaces/ITemps";
import { WaitingForData } from "./WaitingForData";

let getDateStringFromDate = (date?: Date) => 
{
    if(date)
    {
        var newDate = new Date(date);
        return `${getStringWithZeros(newDate.getDay())}.${getStringWithZeros(newDate.getMonth())}.${getStringWithZeros(newDate.getFullYear())}`
    }
    else
        return ''
}

let unixTimeStampToDateString = (timeStamp?:number) => 
{
    if(timeStamp)
    {
        return new Date(timeStamp * 1000)
    }
    else
        return new Date();
}

let getDateWithTimeStringFromDate = (date?: Date) => 
{
    if(date)
    {
        var newDate = new Date(date);
        return `${newDate.toLocaleDateString()} ${getStringWithZeros(newDate.getHours())}:${getStringWithZeros(newDate.getMinutes())}`
    }
    else
        return ''
}

let getStringWithZeros = (number: number) => number<10 ? `0${number}` : `${number}`;

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

let getForecast = (cityId: number) => {
    return apiService.getForecast(cityId).then((res)=>
    {
        return res.data as IComplexCurrentWeather[]
    })
}

export const Forecast: React.FC<{cityId:number}> = ({cityId}) => {
    const[forecast, setForecast] = useState<IComplexCurrentWeather[]>();
    // const[currentForecast, setCurrentForecast] = useState<IComplexCurrentWeather>();
    const[currentIndex, setCurrentIndex] = useState<number>(0);
    
    useEffect(()=>{
        getForecast(cityId).then((res)=>{
            setForecast(res);
            // setCurrentForecast(res[0]);
        })
    },[])

    const handleChangeCurrentForecast = (e:any) =>{
        console.log("E target");
        console.log(e);
        if (forecast != undefined)
            setCurrentIndex(e.target.value);
            // setCurrentForecast(forecast[e.target.value]);
    }

    return(
        <>
            { forecast? (
                <>
                    <Row
                            gutter={[16, 48]}
                            style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}
                            justify='center'>
                        <Col>
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