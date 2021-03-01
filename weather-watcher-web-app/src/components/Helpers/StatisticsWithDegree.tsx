import React from "react"

export const StatisticsWithDegree: React.FC<{title:string,value:number}> = ({title,value}) =>
{
    let degree = <><sup>o</sup></>
    return(
        <>
            <div className={"ant-statistic"}>
                <div className={"ant-statistic-title"}> {title}</div>
                <div className={"ant-statistic-content"}>{value}{degree}</div>
            </div>
        </>
    )
}