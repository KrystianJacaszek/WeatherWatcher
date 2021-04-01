import { Card, Col,  Row, Statistic } from "antd";
import React, { useEffect } from "react";
import { StatisticsWithCelsciusDegree } from "./Helpers/StatisticsWithCelsciusDegree";
import { ImageFromIconName } from "./Helpers/ImageFromIconName";
import { WaitingForData } from "./WaitingForData";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedCity } from "./Slices/selectedCitySlice";
import { fetchCurrentWeather, selectCurrentWeather } from "./Slices/currentWeatherSlice";

export const BasicCurrentWeatherInformation: React.FC = () => {
    const cityId = useSelector(selectSelectedCity);
    const currentWeather = useSelector(selectCurrentWeather);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCurrentWeather(cityId));
    }, [])
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
                                    <StatisticsWithCelsciusDegree title="Min" value={currentWeather.min} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <StatisticsWithCelsciusDegree title="Max" value={currentWeather.max}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Statistic title="Ciśnienie" value={currentWeather.pressure+" hPa"} />
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
