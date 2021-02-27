import { Row, Col, Spin } from "antd"
import React from "react"

export const WaitingForData: React.FC<{message?:string, useSpinner?:boolean}> = ({message, useSpinner}) => {
    return(
        <>
            {message ? (
                <Row
                    gutter={[16, 36]}
                    style={{ alignItems: 'center' }}
                    justify='center'
                >
                    <Col span={24}>{message}{useSpinner != undefined && useSpinner === false ? (<></>) : (<Spin />)}</Col>
                </Row>
            ) : (
                <Row
                    gutter={[16, 36]}
                    style={{ alignItems: 'center' }}
                    justify='center'
                    >
                        <Col span={24}>Trwa wczytywanie danych... <Spin /></Col>
                </Row>
            )}
        </>
    )
}