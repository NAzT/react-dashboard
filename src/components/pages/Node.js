import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from '../menu/Menu.js'
import LineMultiAxis from '../charts/LineMultiAxis.jsx'
import Gauge from '../charts/Gauge.jsx'
import sensorStore from '../../data/SensorStore'
import mqttStore from '../../data/MqttStore'
import _ from 'underscore'

export default class NodeTemplate extends Component {

  constructor (props) {
    super(props)
    this.gauge = {
      temperature: 0,
      humidity: 0,
      pm10: 0,
      pm2_5: 0,
    }
    this.state = {
      nodes: [],
      loading: true,
      group2: [],
      sensorData: {
        multichart: {
          labels: ['pm1', 'pm2.5', 'pm10'],
          data: [0, 0, 0],
          x_labels: [0, 0, 0]
        },
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    this.page_id = nextProps.match.params.id
    this.gauge = mqttStore.state[this.page_id]
    console.log(this.gauge)
  }

  _processStore = () => {
    const station = sensorStore.sensor_stations[this.page_id]
    if (station) {
      this.state.sensorData.x_labels = station.results[0].series[0].values.map((v) => v[0])
      this.state.sensorData.pm1 = station.results[0].series[0].values.map((v) => v[1])
      this.state.sensorData.pm2_5 = station.results[0].series[0].values.map((v) => v[2])
      this.state.sensorData.pm10 = station.results[0].series[0].values.map((v) => v[3])
      this.updateGraphCache()
      this._drawChart()
    }
  }

  componentWillMount () {
    this.page_id = this.props.match.params.id
    mqttStore.addListener(() => {
      this.gauge = mqttStore.state[this.page_id]
      this._drawGauge()
    })
    sensorStore.addListener(() => {
      this._processStore()
    })
    this._processStore()
  }

  updateGraphCache = function () {
    this.data = this.state.sensorData.multichart
    const station = sensorStore.sensor_stations[this.page_id]
    if (station) {
      if (station.results[0].series === undefined) {
        console.error('data not found.')
      }
      else {
        const x_labels = station.results[0].series[0].values.map((v) => v[0])
        const pm1 = station.results[0].series[0].values.map((v) => v[1])
        const pm2_5 = station.results[0].series[0].values.map((v) => v[2])
        const pm10 = station.results[0].series[0].values.map((v) => v[3])
        this.state.sensorData.multichart.x_labels = x_labels
        this.state.sensorData.multichart.data[0] = pm1
        this.state.sensorData.multichart.data[1] = pm2_5
        this.state.sensorData.multichart.data[2] = pm10
      }
    }
    else {
      console.error('station not found.. with id', this.props.match.params)
    }
  }

  // shouldComponentUpdate (nextProps) {
  //   console.log('shoudComponentUpdate', nextProps)
  // }

  componentWillUpdate () {
    this.updateGraphCache()
  }

  _drawChart () {
    ReactDOM.render(<LineMultiAxis data={this.data}/>, document.getElementById('LineMultiAxis'))
  }

  _drawGauge () {
    console.log(this.gauge)
    ReactDOM.render(<Gauge label='อุณหภูมิ' symbol='℃'
                           value={this.gauge.temperature}/>, document.getElementById('temperature-g'))
    ReactDOM.render(<Gauge label='ความชื้น' redraw symbol='%'
                           value={this.gauge.humidity}/>, document.getElementById('humidity-g'))
    ReactDOM.render(<Gauge label='PM10' symbol='µg/m3' value={this.gauge.pm10}/>, document.getElementById('pm10-g'))
    ReactDOM.render(<Gauge label='PM2.5' symbol='µg/m3' value={this.gauge.pm25}/>, document.getElementById('pm2_5-g'))
  }

  componentDidUpdate () {
    this.updateGraphCache()
    this._drawGauge()
    this._drawChart()
  }

  componentDidMount () {
    this.updateGraphCache()
    this._drawGauge()
    this._drawChart()
  }

  _ctxClassName (expect, opposite) {
    if (opposite) {
      return this.state.loading ? expect : ''
    }
    else {
      return !this.state.loading ? expect : ''
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='section'>

          <div className='columns'>
            <div className="column is-3">
              <Menu url={this.props.location.pathname}/>
            </div>
            <div className="column is-9 has-text-centered">

              {/*<div className={this._ctxClassName('card')}>*/}
              {/*<div className={this._ctxClassName('card-content')}>*/}
              {/*<span className={this._ctxClassName('fa fa-refresh fa-spin fa-3x', true)}/>*/}
              {/*</div>*/}
              {/*</div>*/}
              <div className={this._ctxClassName('card')}>
                <div className={this._ctxClassName('card-header')}>
                  <p className='card-header-title'
                     style={{color: '#4468b0'}}>Status</p>
                </div>
                <div className={this._ctxClassName('card-content')}>
                  <div className='columns'>
                    <div id='temperature-g' style={{width: '100%'}}/>
                    <div id='humidity-g' style={{width: '100%'}}/>
                    <div id='pm10-g' style={{width: '100%'}}/>
                    <div id='pm2_5-g' style={{width: '100%'}}/>
                  </div>
                  {/*<div id='masterGauge' className={this._ctxClassName('columns')}*/}
                  {/*style={{width: '100%'}}/>*/}
                </div>
              </div>

              <div className={this._ctxClassName('card')}>
                {/*<div className={this._ctxClassName('card-header')}>*/}
                {/*<p className='card-header-title' style={{color: '#4468b0'}}>Timeline</p>*/}
                {/*</div>*/}
                <div className={this._ctxClassName('card-content')}>
                  <div id='LineMultiAxis'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}