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
        <Col span={12}>
            <WeatherHomePage/>
        </Col>
      </Row>
    </>
  );
}

export default App;
