import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import MasterGauge from './charts/Gauge.jsx'
import store from '../flux/Store'
import _ from 'underscore'

export default class Master extends Component {

  constructor (props) {
    super(props)

    this.state = {
      nodes: [],
      loading: false,
      master: {}
      //status: {}
    }

  }

  _processStore = () => {
    const currentPath = this.props.location.pathname
    let master = _.find(store.menu.master, (menu) => menu.url === currentPath)
    this.setState({
      status: master.data || [1, 2, 3, 4],
      loading: false
    })
  }

  componentWillMount () {
    store.addListener(() => {
      this.setState({master: store.master_data, loading: false})
    })
  }

  componentDidUpdate () {
    if (!this.state.loading) {
      ReactDOM.render(<MasterGauge label='อุณหภูมิ'
                                   value={this.state.master.temperature}
                                   symbol=' c'
      />, document.getElementById('temperature'))
      ReactDOM.render(<MasterGauge label='ความชื้น'
                                   value={this.state.master.humidity}
                                   symbol=' %rh'
      />, document.getElementById('humidity'))
    }
  }

  componentDidMount () {
    //console.log('=== componentDidMount >>> Master')
    if (!this.state.loading) {
      ReactDOM.render(<MasterGauge label='อุณหภูมิ'
                                   value={this.state.master.temperature}/>, document.getElementById('temperature'))
      ReactDOM.render(<MasterGauge label='ความชื้น'
                                   value={this.state.master.humidity}/>, document.getElementById('humidity'))
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
                     style={{color: '#4468b0'}}>{!this.state.loading && 'Status'}</p>
                </div>
                <div className={!this.state.loading ? 'card-content columns' : ''}>
                  <div id='temperature' style={{width: '100%'}}/>
                  <div id='humidity' style={{width: '100%'}}/>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )

  }
}