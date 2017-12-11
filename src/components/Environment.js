import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import TemperatureGauge from './environment/TemperatureGauge.jsx'
import HumidityGauge from './environment/HumidityGauge.jsx'
import store from '../flux/Store'
import _ from 'underscore'

export default class Environment extends Component {

  constructor (props) {
    super(props)

    this.state = {
      nodes: [],
      loading: true,
      nodeMenuItems: [],
      environmentItems: {},
      sensorData: []
    }
  }

  _processStore = () => {

    this.setState({nodeMenuItems: store.menu.nodes})

    const currentUrl = this.props.location.pathname

    let filterEnvironment = _.find(this.state.nodeMenuItems, (menu) => menu.url === currentUrl)

    if (this.state.sensorData.length !== 0) {
      this.setState({
        environmentItems: filterEnvironment,
        sensorData: store.sensor_data,
        loading: false
      })
    }

  }

  componentWillMount () {
    store.addListener(() => {
      //this._processStore()
      this.setState({nodeMenuItems: store.menu.nodes})

      const currentUrl = this.props.location.pathname

      let filterEnvironment = _.find(this.state.nodeMenuItems, (menu) => menu.url === currentUrl)

      // console.log('sensor data ', store.sensor_data)

      if (!_.isEmpty(store.sensor_data)) {
        this.setState({
          environmentItems: filterEnvironment,
          sensorData: store.sensor_data,
          loading: false
        })

        console.log('sensor data ', this.state.sensorData)
      }
    })
  }

  _gaugeRender = () => {
    ReactDOM.render(<TemperatureGauge data={this.state.sensorData}/>, document.getElementById('temperature'))
    ReactDOM.render(<HumidityGauge data={this.state.sensorData}/>, document.getElementById('humidity'))
  }

  componentDidUpdate () {
    if (!this.state.loading) {
      this._gaugeRender()
    }
  }

  componentDidMount () {
    if (!this.state.loading) {
      this._gaugeRender()
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

              <div className={this.state.loading ? 'card' : ''}>
                <div className={this.state.loading ? 'card-content' : ''}>
                  <span className={this.state.loading && 'fa fa-refresh fa-spin fa-3x' || ''}/>
                </div>
              </div>

              <div className={!this.state.loading ? 'card' : ''}>
                <div className={!this.state.loading ? 'card-header' : ''}>
                  <p className='card-header-title'
                     style={{color: '#4468b0'}}>{!this.state.loading && 'Temperature'}</p>
                </div>
                <div className={!this.state.loading ? 'card-content' : ''}>
                  <div id='temperature' className={!this.state.loading && 'columns' || ''}/>
                </div>
              </div>

              <br/>

              <div className={!this.state.loading ? 'card' : ''}>
                <div className={!this.state.loading ? 'card-header' : ''}>
                  <p className='card-header-title'
                     style={{color: '#4468b0'}}>{!this.state.loading && 'Humidity'}</p>
                </div>
                <div className={!this.state.loading ? 'card-content' : ''}>
                  <div id='humidity' className={!this.state.loading && 'columns' || ''}/>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )

  }
}