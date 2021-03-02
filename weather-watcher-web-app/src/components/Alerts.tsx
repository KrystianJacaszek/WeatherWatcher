import { Card, Col, Row, Table } from "antd";
import React, { useState } from "react"
import { useEffect } from "react"
import { apiService } from "../apiService";
import { getDateStringFromDate, unixTimeStampToDateString } from "./Helpers/DateConverters";
import { IAlertDetails } from "./Interfaces/IAlertsDetails";
import { WaitingForData } from "./WaitingForData";

let getAlerts = (cityId: number) => {
    return apiService.getAlerts(cityId).then((res) => {
        return res.data as IAlertDetails[];
    })
}

const columns = [
    {
        title: 'Nazwa zdarzenia',
        dataIndex: 'event',
        key: 'event',
      },
      {
        title: 'Początek zdarzenia',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (key?: number) => (
            <>
                {getDateStringFromDate(unixTimeStampToDateString(key))}
            </>
        )
      },
      {
        title: 'Koniec zdarzenia',
        dataIndex: 'endTime',
        key: 'endTime',
        render: (key?: number) => (
            <>
                {getDateStringFromDate(unixTimeStampToDateString(key))}
            </>
        )
      },
      {
        title: 'Opis',
        dataIndex: 'description',
        key: 'description',
      },
]

export const Alerts: React.FC<{cityId:number}> = ({cityId}) => {
    const[alerts, setAlerts] = useState<IAlertDetails[]>();
    
    useEffect(()=>{
        getAlerts(cityId).then((res) =>{
            setAlerts(res);
        })
    },[])

    return (
        <>
            {alerts ? (
                <>
                    {alerts == null? (
                        <Card>
                            <Row
                                gutter={[16, 36]}
                                style={{ alignItems: 'center', marginBottom: 30}}
                                justify='center'>
                                <Col span={24}>
                                    <Table 
                                            title={() => { return <h3>List ostrzeżeń pogodowych</h3>}}
                                            columns={columns}
                                            dataSource={alerts}
                                            />
                                </Col>
                            </Row>
                        </Card>
                    ) : (
                        <Card>
                            <p>Brak dostępnych ostrzeżeń pogodowych</p>
                        </Card>
                    )}
                </>
            ) : (
                <WaitingForData message="Trwa wczytywanie aktualnych danych pogodowych"/>
            )}
        </>
    )
}