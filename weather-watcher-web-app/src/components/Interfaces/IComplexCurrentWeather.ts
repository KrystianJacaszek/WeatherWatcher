import { IAdditionalInfo } from "./IAdditionalInfo";
import { IFeelTemps } from "./IFeelTemps";
import { ITemps } from "./ITemps";
import { IWind } from "./IWind";

export interface IComplexCurrentWeather{
    temps:ITemps;
    feelTemps:IFeelTemps;
    wind:IWind;
    pressure: number;
    humidity: number;
    additionalInfo: IAdditionalInfo;
    sunrise: number;
    sunset:number;
    clouds:number;
    uvi:number;
    timeStamp: Date;
}