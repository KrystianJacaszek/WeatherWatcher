import React, { useEffect } from "react";
import { ComplexCurrentWeatherPartial } from "./ComplexCurrentWeatherPartial";
import { WaitingForData } from "./WaitingForData";
import { selectSelectedCity } from './Slices/selectedCitySlice'
import { useDispatch, useSelector } from "react-redux";
import { selectComplexCurrentWeather, fetchComplexCurrentWeather } from './Slices/complexCurrentWeatherSlice';

export const ComplexCurrentWeather: React.FC = () => {
    const cityId = useSelector(selectSelectedCity);
    const complexCurrentWeather = useSelector(selectComplexCurrentWeather)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchComplexCurrentWeather(cityId));
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