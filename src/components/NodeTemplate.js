import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import LineMultiAxis from './LineMultiAxis.jsx'
import Gauge from './NodeGauge.jsx'
import store from '../flux/Store'
import _ from 'underscore'

export default class NodeTemplate extends Component {

  constructor (props) {
    super(props)

    this.state = {
      nodes: [],
      loading: true,
      graphs: {
        data: [],
        labels: ''
      },
      masterMenuItems: [],
      nodeMenuItems: [],
      sensorData: {
        temperature: {
          chart: {
            label: 'temperature',
            data: [],
            labels: [1]
          }
        },
        humidity: {
          chart: {
            label: 'humidity',
            data: [],
            labels: [1]
          }
        }
      }
    }

    console.log('=== constructor')
  }

  _processStore = () => {

    if (store.sensor_data[this.props.match.params.id]) {

      this.setState({sensorData: store.sensor_data[this.props.match.params.id]})

      this.setState({
        graphs: Object.assign({}, this.state.sensorData.temperature.chart),
        loading: false
      })

    }

  }

  componentWillMount () {
    console.log('=== componentWillMount >>> NodeTemplate')

    store.addListener(() => {
      this._processStore()
    })
  }

  componentDidUpdate () {
    if (!this.state.loading) {
      ReactDOM.render(<LineMultiAxis data={[this.state.graphs]}/>, document.getElementById('LineMultiAxis'))
    }
  }

  componentDidMount () {
    if (!this.state.loading) {
      console.log('=== componentDidMount >>> loading false')
      ReactDOM.render(<LineMultiAxis data={[this.state.graphs]}/>, document.getElementById('LineMultiAxis'))
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
                  <p className='card-header-title' style={{color: '#4468b0'}}>{!this.state.loading && 'Timeline'}</p>
                </div>
                <div className={!this.state.loading ? 'card-content' : ''}>
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