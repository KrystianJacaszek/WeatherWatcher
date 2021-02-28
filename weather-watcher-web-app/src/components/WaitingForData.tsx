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
                    <Col>{message}</Col>
                    <Col>{useSpinner != undefined && useSpinner === false ? (<></>) : (<Spin />)}</Col>
                </Row>
            ) : (
                <Row
                    gutter={[16, 36]}
                    style={{ alignItems: 'center' }}
                    justify='center'
                    >
                        <Col>Trwa wczytywanie danych...</Col>
                        <Col> <Spin /></Col>
                </Row>
            )}
        </>
    )
}