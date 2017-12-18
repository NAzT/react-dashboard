import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from '../menu/Menu.js'
import LineMultiAxis from '../charts/LineMultiAxis.jsx'
import Gauge from '../charts/Gauge.jsx'
import store from '../../data/SensorStore'
import mqttStore from '../../data/MqttStore'
import _ from 'underscore'

export default class NodeTemplate extends Component {

  constructor (props) {
    super(props)
    this.multi_line_charts = {}
    this.gauge = {
      temperature: 0,
      humidity: 0,
      pm10: 0,
      pm25: 0,
    }
    this.state = {
      nodes: [],
      loading: true,
      masterMenuItems: [],
      group2: [],
      sensorData: {
        multichart: {
          labels: ['pm1', 'pm2.5', 'pm10'],
          data: [0, 0, 0]
        },
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    this.page_id = nextProps.match.params.id
    this.gauge = mqttStore.state[this.page_id]
  }

  _processStore = () => {
    const station = store.sensor_stations[this.page_id]
    if (station) {
      const pm1 = station.results[0].series[0].values.map((v) => v[1])
      const pm2_5 = station.results[0].series[0].values.map((v) => v[2])
      const pm10 = station.results[0].series[0].values.map((v) => v[3])
      this.setState((prevState, props) => {
        return {
          sensorData: {
            multichart: Object.assign({}, {data: [pm1, pm2_5, pm10], labels: ['pm1', 'pm2.5', 'pm10']})
          }
        }
      })
      this.updateGraphCache()
    }
  }

  componentWillMount () {
    this.page_id = this.props.match.params.id
    console.log(`will mount with page_id => ${this.page_id}`)
    this._processStore()
    mqttStore.addListener(() => {
      this.gauge = mqttStore.state[this.page_id]
      this._drawGauge()
    })
    store.addListener(() => {
      this._processStore()
    })
  }

  updateGraphCache = function () {
    this.data = this.state.sensorData.multichart
    const station = store.sensor_stations[this.page_id]
    if (station) {
      if (station.results[0].series === undefined) {
        console.error('data not found.')
      }
      else {
        const pm1 = station.results[0].series[0].values.map((v) => v[1])
        const pm2_5 = station.results[0].series[0].values.map((v) => v[2])
        const pm10 = station.results[0].series[0].values.map((v) => v[3])
        this.multi_line_charts = this.state.sensorData.multichart
        this.multi_line_charts.data[0] = pm1
        this.multi_line_charts.data[1] = pm2_5
        this.multi_line_charts.data[2] = pm10
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
    ReactDOM.render(<Gauge
        label='อุณหภูมิ'
        symbol='℃' value={this.gauge.temperature}/>,
      document.getElementById('temperature-g'))
    ReactDOM.render(<Gauge label='ความชื้น'
                           redraw
                           symbol='%'
                           value={this.gauge.humidity}/>, document.getElementById('humidity-g'))
    ReactDOM.render(<Gauge label='PM10'
                           symbol='ppm'
                           value={this.gauge.pm10}/>, document.getElementById('pm10-g'))
    ReactDOM.render(<Gauge label='PM2.5'
                           symbol='ppm'
                           value={this.gauge.pm25}/>, document.getElementById('pm25-g'))
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
                    <div id='pm25-g' style={{width: '100%'}}/>
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