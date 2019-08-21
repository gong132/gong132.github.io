import React from 'react'
import { Button } from 'antd'
import { Map, InfoWindow, AMap } from 'react-amap';
import api from '../../../api/index'
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      mapZoom: 13,
      mapKey: "1b2976340698a665f37181e07ba9d917",
    }
  }
  render() {
    const { mapZoom, mapKey } = this.state
    return (
      <div style={{height:"86vh"}}>
        <Map
          amapkey={mapKey}
          zoom={mapZoom}
        ></Map>
      </div>
    )
  }
}
export default Index;