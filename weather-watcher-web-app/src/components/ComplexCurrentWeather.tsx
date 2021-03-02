import { Card, Row, Col, Statistic } from "antd";
import React, { useState, useEffect } from "react";
import { apiService } from "../apiService";
import { ComplexCurrentWeatherPartial } from "./ComplexCurrentWeatherPartial";
import { StatisticsWithCelsciusDegree } from "./Helpers/StatisticsWithCelsciusDegree";
import { StatisticsWithDegree } from "./Helpers/StatisticsWithDegree";
import { IComplexCurrentWeather } from "./Interfaces/IComplexCurrentWeather";
import { WaitingForData } from "./WaitingForData";

let getComplexCurrentWeather = (cityId: number) => {
    return apiService.getComplexCurrentWeather(cityId).then((res)=>
    {
        return res.data as IComplexCurrentWeather;
    })
}

export const ComplexCurrentWeather: React.FC<{cityId:number}> = ({cityId}) => {
    const[complexCurrentWeather, setComplexCurrentWeather] = useState<IComplexCurrentWeather>();
    
    useEffect(()=>{
        getComplexCurrentWeather(cityId).then((res)=>{
            setComplexCurrentWeather(res);
        })
    },[])

    return(
        <>
            { complexCurrentWeather? (
              <ComplexCurrentWeatherPartial complexCurrentWeather={complexCurrentWeather}/>
            ) : (
               <>
                    <WaitingForData message="Trwa ładowanie szczegółowych danych pogodowych"/>
               </>
            )}
        </>
    )
}