import { Card, Row, Col, Statistic } from "antd";
import React from "react";
import { getDateStringFromDate, unixTimeStampToDateString, getTimeStringFromDate } from "./Helpers/DateConverters";
import { StatisticsWithCelsciusDegree } from "./Helpers/StatisticsWithCelsciusDegree";
import { StatisticsWithDegree } from "./Helpers/StatisticsWithDegree";
import { IComplexCurrentWeather } from "./Interfaces/IComplexCurrentWeather";
import { WaitingForData } from "./WaitingForData";

export const ComplexCurrentWeatherPartial: React.FC<{complexCurrentWeather:IComplexCurrentWeather}> = ({complexCurrentWeather}) => {
    
    return(
        <>
            { complexCurrentWeather? (
                <>
                    <h4>Na dzień: {getDateStringFromDate(unixTimeStampToDateString(complexCurrentWeather.unixDateTime))}</h4>
                    <Card>
                        <h3>Odczuwalne temperatury</h3>
                        <Card style={{marginBottom: 20}}>
                            <Row
                                gutter={[0, 24]}
                                style={{ alignItems: 'center' }}
                                justify='center'>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <StatisticsWithCelsciusDegree title="Dzień" value={complexCurrentWeather.feelTemps.day} />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <StatisticsWithCelsciusDegree title="Noc" value={complexCurrentWeather.feelTemps.night} />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <StatisticsWithCelsciusDegree title="Południe" value={complexCurrentWeather.feelTemps.morning} />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <StatisticsWithCelsciusDegree title="Wieczór" value={complexCurrentWeather.feelTemps.evening} />
                                </Col>
                            </Row>
                        </Card>
                        <Row  gutter={[16, 36]}
                            style={{ alignItems: 'space-between', marginBottom: 20}}
                            justify='space-between'>
                            <Col span={12}>
                                <h3>Temperatury</h3>
                                <Card>
                                    <Row
                                        gutter={[16, 12]}
                                        style={{ alignItems: 'center' }}
                                        justify='center'>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <StatisticsWithCelsciusDegree title="Dzień" value={complexCurrentWeather.temps.day} />
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <StatisticsWithCelsciusDegree title="Noc" value={complexCurrentWeather.temps.night} />
                                        </Col>                            
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <StatisticsWithCelsciusDegree title="Min" value={complexCurrentWeather.temps.min} />
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <StatisticsWithCelsciusDegree title="Max" value={complexCurrentWeather.temps.max} />
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <StatisticsWithCelsciusDegree title="Południe" value={complexCurrentWeather.temps.morning} />
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <StatisticsWithCelsciusDegree title="Wieczór" value={complexCurrentWeather.temps.evening} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <h3>Szczegółowe informacje</h3>
                                <Card>
                                    <Row
                                        gutter={[16, 12]}
                                        style={{ alignItems: 'center' }}
                                        justify='center'>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <Statistic title="Ciśnienie" value={complexCurrentWeather.pressure+"hPa"} />
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <Statistic title="Wilgotność" value={complexCurrentWeather.humidity+"%"} />
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <Statistic title="Zachmurzenie" value={complexCurrentWeather.clouds+"%"}/>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                        <Statistic title="Index UV" value={complexCurrentWeather.uvi}/>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <Statistic title="Zachód słońca" value={complexCurrentWeather.sunset ? getTimeStringFromDate(unixTimeStampToDateString(complexCurrentWeather.sunset)) : "Brak danych"} />
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <Statistic title="Świt" value={complexCurrentWeather.sunrise ? getTimeStringFromDate(unixTimeStampToDateString(complexCurrentWeather.sunrise)) : "Brak danych"} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <h3>Wiatr</h3>
                        <Card style={{marginBottom: 20}}>
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
                    </Card>
                </>
            ) : (
               <>
                    <WaitingForData message="Trwa ładowanie szczegółowych danych pogodowych"/>
               </>
            )}
        </>
    )
}