import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import MasterGauge from './master/Gauge.jsx'
import store from '../flux/Store'
import _ from 'underscore'

export default class Master extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount () {
  }

  componentDidUpdate () {
  }

  componentDidMount () {
  }

  render () {

    return (
      <div className='container'>
        <div className='section'>

          <div className='columns'>
            <div className="column is-3">
              <Menu url={this.props.location.pathname}/>
            </div>
            <div className="column has-text">
              Refreshing Siam is in progress
            </div>
          </div>

        </div>
      </div>)

  }
}