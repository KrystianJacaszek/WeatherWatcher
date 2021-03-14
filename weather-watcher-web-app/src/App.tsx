import React from 'react';
import './App.css';
import { WeatherHomePage } from './components/WeatherHomePage';
import { Col, Row } from 'antd';

function App() {
  return (
    <>
      <Row
        style={{ alignItems: 'center' }}
        justify='center'>
        <Col xs={23} sm={23} md={23} lg={18} xl={18} xxl={12}>
            <WeatherHomePage/>
        </Col>
      </Row>
    </>
  );
}

export default App;
