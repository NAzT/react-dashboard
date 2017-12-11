import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import LineMultiAxis from './LineMultiAxis.jsx'
import MasterGauge from './master/Gauge.jsx'
import store from '../flux/Store'
import influx_sensor from '../api/data.influx.json'
import _ from 'underscore'
// import Gauge from './NodeGauge.jsx'

export default class NodeTemplate extends Component {

  constructor (props) {
    super(props)
    this.multi_line_charts = {}
    this.state = {
      nodes: [],
      loading: true,
      gauge: {
        temperature: 30,
        humidity: 30,
        pm10: 30,
        pm25: 30,
      },
      masterMenuItems: [],
      nodeMenuItems: [],
      sensorData: {
        multichart: {
          labels: ['pm1', 'pm2.5', 'pm10'],
          data: [0, 0, 0]
        },
      }
    }
  }

  _processStore = () => {
    const station = store.sensor_stations[this.props.match.params.id - 1]
    console.log('incoming station =>', station, this.props.match.params.id - 1)
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
    console.log('will mount')
    this._processStore()
    store.addListener(() => {
      this._processStore()
    })
  }

  updateGraphCache = function () {
    this.data = this.state.sensorData.multichart
    const station = store.sensor_stations[this.props.match.params.id - 1]
    if (station) {
      const pm1 = station.results[0].series[0].values.map((v) => v[1])
      const pm2_5 = station.results[0].series[0].values.map((v) => v[2])
      const pm10 = station.results[0].series[0].values.map((v) => v[3])
      this.multi_line_charts = this.state.sensorData.multichart
      this.multi_line_charts.data[0] = pm1
      this.multi_line_charts.data[1] = pm2_5
      this.multi_line_charts.data[2] = pm10
      console.log('did update...')
    }
    else {
      console.error('station not found.. with id', this.props.match.params)
    }
  }

  componentWillUpdate () {
    this.updateGraphCache()
    console.log('component will update with station')
  }

  componentDidUpdate () {
    this.updateGraphCache()

    ReactDOM.render(<LineMultiAxis data={this.data}/>, document.getElementById('LineMultiAxis'))

    ReactDOM.render(<MasterGauge label='อุณหภูมิ'
                                 value={this.state.gauge.temperature}/>, document.getElementById('temperature-g'))
    ReactDOM.render(<MasterGauge label='ความชื้น'
                                 value={this.state.gauge.humidity}/>, document.getElementById('humidity-g'))
    ReactDOM.render(<MasterGauge label='PM10'
                                 value={50}/>, document.getElementById('pm10-g'))
    ReactDOM.render(<MasterGauge label='PM2.5'
                                 value={this.state.gauge.humidity}/>, document.getElementById('pm25-g'))
  }

  componentDidMount () {
    // TODO: FILTER DATA HERE.
    // this.setState({sensorData: store.sensor_data[this.props.match.params.id]})
    // this.setState({
    //   graphs: this.state.sensorData.temperature.chart,
    //   loading: false
    // })
    console.log('did mount')
    this.updateGraphCache()
    // this.setState({loading: false})
    // if (!this.state.loading) {
    ReactDOM.render(<LineMultiAxis data={this.data}/>, document.getElementById('LineMultiAxis'))
    ReactDOM.render(<MasterGauge label='อุณหภูมิ'
                                 value={this.state.gauge.temperature}/>, document.getElementById('temperature-g'))
    ReactDOM.render(<MasterGauge label='ความชื้น'
                                 value={this.state.gauge.humidity}/>, document.getElementById('humidity-g'))
    ReactDOM.render(<MasterGauge label='PM10'
                                 value={this.state.gauge.pm10}/>, document.getElementById('pm10-g'))
    ReactDOM.render(<MasterGauge label='PM2.5'
                                 value={this.state.gauge.pm25}/>, document.getElementById('pm25-g'))
    // }
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
                <div className={this._ctxClassName('card-header')}>
                  <p className='card-header-title' style={{color: '#4468b0'}}>Timeline</p>
                </div>
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