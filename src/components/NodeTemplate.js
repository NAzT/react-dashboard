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
    this.setState({loading: false})
    if (!this.state.loading) {
      console.log('=== componentDidMount >>> loading false')
      ReactDOM.render(<LineMultiAxis data={[this.state.graphs]}/>, document.getElementById('LineMultiAxis'))
    }
  }

  _ctxClassName (expect) {
    return !this.state.loading ? expect : ''
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

              <div className={this._ctxClassName('card')}>
                <div className={this._ctxClassName('card-content')}>
                  <span className={this.state.loading && 'fa fa-refresh fa-spin fa-3x' || ''}/>
                </div>
              </div>
              {/*guage */}
              <div className={this._ctxClassName('card')}>
                <div className={this._ctxClassName('card-header')}>
                  <p className='card-header-title'
                     style={{color: '#4468b0'}}>{!this.state.loading && 'Status'}</p>
                </div>
                <div className={this._ctxClassName('card-content')}>
                  <div id='masterGauge' className={this._ctxClassName('columns')}
                       style={{width: '100%'}}/>
                </div>
              </div>

              <div className={this._ctxClassName('card')}>
                <div className={this._ctxClassName('card-header')}>
                  <p className='card-header-title' style={{color: '#4468b0'}}>{!this.state.loading && 'Timeline'}</p>
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