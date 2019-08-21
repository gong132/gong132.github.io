import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'antd'
import { Map, InfoWindow, AMap } from 'react-amap';
import Geolocation from 'react-amap-plugin-geolocation'
import { func } from 'prop-types';
import api from '../../../../api/index'

//控制地图放大缩小的自定义组件
const MyMapComponent = (props) => {
  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const wrapperStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '5px',
    border: '1px solid #333'
  }
  const spanStyle = {
    display: 'inline-block',
    height: '30px',
    lineHeight: '30px',
    width: '30px',
    textAlign: 'center',
    borderRadius: '50%',
    margin: '0 5px',
    cursor: 'pointer',
    background: '#333',
    color: '#fff',
    fontSize: '16px',
    border: '1px solid #333'
  }
  const zoomIn = () => map.zoomIn()
  const zoomOut = () => map.zoomOut()

  return (<div style={wrapperStyle} id="zoom-ctrl">
    <span style={spanStyle} onClick={zoomIn}>+</span>
    <span style={spanStyle} onClick={zoomOut}>-</span>
  </div>);
}

//信息窗体组件


class myMap extends React.Component {
  constructor(props) {
    super(props)
    this.sendAddr = this.sendAddr.bind(this)
    this.state = {
      mapZoom: 13,
      mapKey: "1b2976340698a665f37181e07ba9d917",
      curVisibleWindow: false,
      address: '默认地址',
      showEdit: false,
      events: {

      },
      content: {},
      dbcenter: '',
      positionDefault: {
        longitude: 120,
        latitude: 30
      },
    }
  }
  componentDidMount() {

  }
  componentWillMount() {
    if (this.props.title == "编辑") {
      console.log("编辑操作")
      const content = this.props.content
      let address = content.province + content.city
      this.setState({
        dbCenter: this.props.content.dbcenter,
        content: content,
        showEdit: true
      })
    }
  }
  //发送数据
  sendAddr() {
    //走添加接口
    if (this.props.title === "添加") {
      console.log("发送地址")
      const dbcenter = document.getElementById("lnglat").value;
      console.log(dbcenter)
      const address = this.state.result
      let params = {
        country: "China",
        province: address.province,
        city: address.city,
        dbcenter: dbcenter,
        longitude: this.state.positionDefault.longitude,
        latitude: this.state.positionDefault.latitude,
        createUserId: window.localStorage.id
      }
      console.log(params)
      api.dbCenter_add(params)
        .then(res => {
          console.log(res)
          if(res.status == 200) {
            this.props.updataEdit()
          } 
        })
    }
    else if (this.props.title === "编辑") {
      let params = {}
      const dbcenter = document.getElementById("lnglat").value;
      const content = this.props.content
      if (this.state.curVisibleWindow) {
        //如果编辑改变了地理位置
        console.log(dbcenter)
        const address = this.state.result
        params = {
          id:this.props.content.id,
          country: "China",
          province: address.province,
          city: address.city,
          dbcenter: dbcenter,
          longitude: this.state.positionDefault.longitude,
          latitude: this.state.positionDefault.latitude,
          createUserId: window.localStorage.id
        }
      }
      else {
        //直接修改数据中心
        params = {
          id:content.id,
          country: "China",
          province: content.province,
          city:content.city,
          dbcenter:dbcenter,
          longitude:content.longitude,
          latitude:content.latitude,
          createUserId: window.localStorage.id
        }
      }
      api.dbCenter_edit(params)
      .then(res => {
        console.log(res)
        if(res.status == 200) {
          this.props.updataEdit()
        }
      })
    }
    this.props.updateParent()
  }

  render() {
    const { mapZoom, mapKey, address, dbcenter } = this.state
    //给地图添加事件
    const events = {
      created: (ins) => { console.log(ins) },
      click: (ins) => {
        const self = this
        console.log('you have clicked', this)
        //点击后让信息窗体显示
        this.setState({
          curVisibleWindow: true,
          showEdit: false
        })
        //点击地图获取当前的位置，然后将信息传入信息窗体中
        console.log(ins)
        //纬度
        const lat = ins.lnglat.lat
        //经度
        const lng = ins.lnglat.lng
        //根据经纬度进行逆地址编码转换为实际地址
        let addr = lng + "," + lat
        window.geocoder.getAddress(addr, function (status, result) {
          console.log(status, result)
          if (status === 'complete' && result.regeocode) {
            self.setState({
              result: result.regeocode.addressComponent,
              address: result.regeocode.formattedAddress,
              positionDefault: {
                longitude: lng,
                latitude: lat,
              }
            })
          }
        })
      }
    }
    //给窗体添加事件
    const events_2 = {
      close: (ins) => {
        console.log(ins)
        this.setState({
          curVisibleWindow: false
        })
      },
      created: (ins) => { console.log(ins) }
    }

    console.log(this.state.curVisibleWindow, this.state.showEdit)
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '65vw', height: '70vh' }}>
          <span>{this.props.title}</span>
          <span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '60vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '65vh', overflow: 'auto', padding: 10 }}>
            <Map
              amapkey={mapKey}
              zoom={mapZoom}
              events={events}
            >
              <MyMapComponent />
              {this.state.curVisibleWindow || this.state.showEdit ? <InfoWindow
                showShadow={true}
                visible={this.state.curVisibleWindow || this.state.showEdit}
                // content={html}
                position={this.state.positionDefault}
                events={
                  events_2
                }
                closeWhenClickMap={true}
              >
                {this.state.showEdit ? <p></p> : <p>地址:<span id="addr">{address}</span></p>}
                <label>数据中心:</label><input id="lnglat" defaultValue={this.state.dbCenter} placeholder="数据中心" />
                <button onClick={() => this.sendAddr()}>{this.props.title}</button>
              </InfoWindow> : null}
            </Map>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Form.create()(myMap)