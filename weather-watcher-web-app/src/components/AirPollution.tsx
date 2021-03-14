import { Card, Col, Row, Table } from "antd";
import React, { useEffect } from "react"
import { StatisticsForAirPollution } from "./Helpers/StatisticsForAirPollution";
import { WaitingForData } from "./WaitingForData";
import { getDateStringWithTimeFromDate } from "./Helpers/DateConverters";
import { selectSelectedCity } from './selectedCitySlice';
import { useDispatch, useSelector } from "react-redux";
import { fetchAirPollutionList, selectAirPollutionList} from './airPollutionListSlice';

const AirQualityIndexToName : {[key: number]: string} = {
    1:"Bardzo dobra",
    2:"Dobra",
    3:"Dostateczna",
    4:"Zła",
    5:"Bardzo zła"
}

const columns = [
    {
        title: 'Co',
        dataIndex: 'co',
        key: 'co',
      },
      {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
      },
      {
        title: () => {
            return <>No<sub>2</sub></>
        },
        dataIndex: 'no2',
        key: 'no2',
      },
      {
        title: () => {
            return <>O<sub>3</sub></>
        },
        dataIndex: 'o3',
        key: 'o3',
      },
      {
        title: () => {
            return <>So<sub>2</sub></>
        },
        dataIndex: 'so2',
        key: 'so2',
      },
      {
        title: () => {
            return <>Nh<sub>3</sub></>
        },
        dataIndex: 'nh3',
        key: 'nh3',
      },
      {
        title: () => {
            return <>Pm<sub>25</sub></>
        },
        dataIndex: 'pm25',
        key: 'pm25',
      },
      {
        title: () => {
            return <>Pm<sub>10</sub></>
        },
        dataIndex: 'pm10',
        key: 'pm10',
      },
      {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
        render: (key?: Date) => (
            <>
                {getDateStringWithTimeFromDate(key)}
            </>
        )
      },
]

export const AirPollution: React.FC = () => {
    const cityId = useSelector(selectSelectedCity);
    const airPollutionList = useSelector(selectAirPollutionList);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchAirPollutionList(cityId));
    },[])
    return(
        <>
            {airPollutionList ? (
                <Card>
                    <Row
                        gutter={[16, 36]}
                        style={{ alignItems: 'center', marginBottom: 30}}
                        justify='center'>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <h4>Jakość powietrza: </h4>{AirQualityIndexToName[airPollutionList[0].airQualityIndex]}
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <h4>Data pomiaru: </h4> {getDateStringWithTimeFromDate(airPollutionList[0].date)}
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8}>
                            <StatisticsForAirPollution title="CO" value={airPollutionList[0].co} />
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8}>
                            <StatisticsForAirPollution title="No" value={airPollutionList[0].no} />
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8}>
                            <StatisticsForAirPollution title="No" sub="2"  value={airPollutionList[0].no2} />
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8}>
                            <StatisticsForAirPollution title="O" sub="3" value={airPollutionList[0].o3} />
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8}>
                            <StatisticsForAirPollution title="So" sub="2" value={airPollutionList[0].so2} />
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8}>
                            <StatisticsForAirPollution title="Nh" sub="3"  value={airPollutionList[0].nh3} />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <StatisticsForAirPollution title="Pm" sub="25" value={airPollutionList[0].pm10} />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <StatisticsForAirPollution title="Pm" sub="10" value={airPollutionList[0].pm25} />
                        </Col>
                        <Col span={24}>
                           <Table 
                                  scroll={{ x: true }}
                                  title={() => { return <h3>Dane statystyczne</h3>}}
                                  columns={columns}
                                  dataSource={airPollutionList}
                                  pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15',]}}/>
                        </Col>
                    </Row>
                </Card>
            ) : (
                <WaitingForData/>
            )}

        </>
    )
}