import { Card, Row, Col, Statistic } from "antd";
import { timeStamp } from "console";
import React, { useState, useEffect } from "react";
import { apiService } from "../apiService";
import { ImageFromIconName } from "./ImageFromIconName";
import { StatisticsWithCelsciusDegree } from "./StatisticsWithCelsciusDegree";
import { StatisticsWithDegree } from "./StatisticsWithDegree";
import { WaitingForData } from "./WaitingForData";

export interface Temps{
    day:number;
    min:number;
    max:number;
    night:number;
    evening:number;
    morning:number;
}

export interface FeelTemps{
    day:number;
    night:number;
    evening:number;
    morning:number;
}

export interface Wind{
    speed:number;
    degree:number;
}

export interface AdditionalInfo{
    id:number;
    main:string;
    description:string;
    icon:string;
}

export interface ComplexCurrentWeather{
    temps:Temps;
    feelTemps:FeelTemps;
    wind:Wind;
    pressure: number;
    humidity: number;
    additionalInfo: AdditionalInfo;
    sunrise: number;
    sunset:string;
    clouds:number;
    uvi:number;
    timeStamp: Date;
}
let getComplexCurrentWeather = (cityId: number) => {
    return apiService.getComplexCurrentWeather(cityId).then((res)=>
    {
        return res.data as ComplexCurrentWeather;
    })
}

let unixTimeStampToDateString = (timeStamp:number) => new Date(timeStamp * 1000);

let getDatestringFromDate = (date?: Date) => 
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

export const ComplexCurrentWeather: React.FC<{cityId:number}> = ({cityId}) => {
    const[complexCurrentWeather, setComplexCurrentWeather] = useState<ComplexCurrentWeather>();
    
    useEffect(()=>{
        getComplexCurrentWeather(cityId).then((res)=>{
            console.log(getDatestringFromDate(unixTimeStampToDateString(res.sunrise)));
            setComplexCurrentWeather(res);
        })
    },[])

    return(
        <>
            { complexCurrentWeather? (
                <Card>
                    <Row  gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                        <Col>
                            <h3>Temperatury</h3>
                            <Card>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Dzień" value={complexCurrentWeather.temps.day} />
                                    </Col>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Noc" value={complexCurrentWeather.temps.night} />
                                    </Col>                            
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Min" value={complexCurrentWeather.temps.min} />
                                    </Col>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Max" value={complexCurrentWeather.temps.max} />
                                    </Col>
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Południe" value={complexCurrentWeather.temps.morning} />
                                    </Col>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Wieczór" value={complexCurrentWeather.temps.evening} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col>
                            <h3>Odczuwalne temperatury</h3>
                            <Card>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Dzień" value={complexCurrentWeather.feelTemps.day} />
                                    </Col>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Noc" value={complexCurrentWeather.feelTemps.night} />
                                    </Col>
                                </Row>
                                <Row
                                    gutter={[16, 36]}
                                    style={{ alignItems: 'center' }}
                                    justify='center'>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Południe" value={complexCurrentWeather.feelTemps.morning} />
                                    </Col>
                                    <Col span={12}>
                                        <StatisticsWithCelsciusDegree title="Wieczór" value={complexCurrentWeather.feelTemps.evening} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <h3>Wiatr</h3>
                    <Card>
                        <Row
                            gutter={[16, 36]}
                            style={{ alignItems: 'center' }}
                            justify='center'>
                            <Col span={12}>
                                <Statistic title="Szybkość" value={complexCurrentWeather.wind.speed+"m/s"} />
                            </Col>
                            <Col span={12}>
                                <StatisticsWithDegree title="Kierunek" value={complexCurrentWeather.wind.degree} />
                            </Col>
                        </Row>
                    </Card>
                    <Row
                        gutter={[16, 36]}
                        style={{ alignItems: 'center' }}
                        justify='center'>
                        <Col span={12}>
                            {/* {complexCurrentWeather.sunrise} */}
                        </Col>
                    </Row>
                </Card>
            ) : (
               <>
                    <WaitingForData/>
               </>
            )}
        </>
    )
}