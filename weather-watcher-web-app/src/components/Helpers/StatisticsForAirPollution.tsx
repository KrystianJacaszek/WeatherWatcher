import React from "react"

export const StatisticsForAirPollution: React.FC<{title:string, sub?:string, value:number}> = ({title,sub,value}) =>
{
    let metrics = <>μg/m<sup>3</sup></>
    let titleSub = <><sub>{sub}</sub></>
    return(
        <>
            <div className={"ant-statistic"}>
                <div className={"ant-statistic-title"}> {title}{titleSub}</div>
                <div className={"ant-statistic-content"}>{value}{metrics}</div>
            </div>
        </>
    )
}