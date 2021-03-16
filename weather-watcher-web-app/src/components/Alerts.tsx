import { Card, Col, Row, Table } from "antd";
import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchAlertList, selectAlertList } from "./alertListSlice";
import { getDateStringWithTimeFromDate, unixTimeStampToDateString } from "./Helpers/DateConverters";
import { selectSelectedCity } from "./selectedCitySlice";
import { WaitingForData } from "./WaitingForData";

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
                {getDateStringWithTimeFromDate(unixTimeStampToDateString(key))}
            </>
        )
      },
      {
        title: 'Koniec zdarzenia',
        dataIndex: 'endTime',
        key: 'endTime',
        render: (key?: number) => (
            <>
                {getDateStringWithTimeFromDate(unixTimeStampToDateString(key))}
            </>
        )
      },
      {
        title: 'Opis',
        dataIndex: 'description',
        key: 'description',
      },
]

export const Alerts: React.FC = () => {
    const cityId = useSelector(selectSelectedCity);
    const alerts = useSelector(selectAlertList);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchAlertList(cityId));
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
                <WaitingForData message="Trwa wczytywanie ostrzeżeń pogodowych"/>
            )}
        </>
    )
}