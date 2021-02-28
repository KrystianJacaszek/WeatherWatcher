import { Card, Col,  Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import { apiService } from "../apiService";
import { ImageFromIconName } from "./ImageFromIconName";
import { StatisticsWithCelsciusDegree } from "./StatisticsWithCelsciusDegree";
import { WaitingForData } from "./WaitingForData";

export interface CurrentWeather{
    temp:number;
    feelsTemp:number;
    min:number;
    max:number;
    pressure:number;
    icon:string;
    timrStamp: Date;
}

let getCurrentWeather = (cityId: number) => {
    return apiService.getCurrentWeather(cityId).then((res) => {
        return res.data as CurrentWeather;
    })
}

export const BasicCurrentWeatherInformation: React.FC<{cityId:number}> = ({cityId}) => {
    const[currentWeather, setCurrentWeather] = useState<CurrentWeather>();

    

    useEffect(()=>{
        getCurrentWeather(cityId).then((res)=> {
            setCurrentWeather(res);
        })
    })
    return (
        <>
            {currentWeather ? (
            <>
                <Card>
                    <Row
                        gutter={[16, 36]}
                        style={{ alignItems: 'center' }}
                        justify='center'>
                        <Col span={12}>
                            <Statistic title="Temperatura" value={currentWeather.temp} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Odczuwalna temperatura" value={currentWeather.feelsTemp} />
                        </Col>
                    </Row>
                    <Row
                        gutter={[16, 36]}
                        style={{ alignItems: 'center' }}
                        justify='center'>
                        <Col span={12}>
                            <Row>
                                <Col>
                                    <StatisticsWithCelsciusDegree title="Min" value={currentWeather.min.toString()} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <StatisticsWithCelsciusDegree title={"Max"} value={currentWeather.max.toString()}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Statistic title="Ciśnienie" value={currentWeather.pressure+" hpa"} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <ImageFromIconName icon={currentWeather.icon}/>
                        </Col>
                    </Row>
                </Card>
            </>
            ) : (
               <>
                    <WaitingForData message="Trwa wczytywanie aktualnych danych pogodowych"/>
               </>
            )}

        </>
    );
}
