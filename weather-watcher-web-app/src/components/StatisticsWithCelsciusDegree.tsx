import React from "react"

export const StatisticsWithCelsciusDegree: React.FC<{title:string,value:string}> = ({title,value}) =>
{
    let celciusDegree = <><sup>o</sup>C</>
    return(
        <>
            <div className={"ant-statistic"}>
                <div className={"ant-statistic-title"}> {title}</div>
                <div className={"ant-statistic-content"}>{value}{celciusDegree}</div>
            </div>
        </>
    )
}