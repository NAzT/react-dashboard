import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import TemperatureGauge from './gauges/environment/TemperatureGauge.jsx'
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

    this.setState({
      environmentItems: filterEnvironment,
      sensorData: store.sensor_data,
      loading: false
    })

  }

  componentWillMount () {
    store.addListener(() => {
      this._processStore()
    })

  }

  componentDidUpdate () {
    if (!this.state.loading) {
      ReactDOM.render(<TemperatureGauge data={this.state.sensorData}/>, document.getElementById('TemperatureGauge'))
    }
  }

  componentDidMount () {
    if (!this.state.loading) {
      ReactDOM.render(<TemperatureGauge data={this.state.sensorData}/>, document.getElementById('TemperatureGauge'))
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
                     style={{color: '#4468b0'}}>{!this.state.loading && 'Average'}</p>
                </div>
                <div className={!this.state.loading ? 'card-content' : ''}>
                  <div id='TemperatureGauge'/>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )

  }
}