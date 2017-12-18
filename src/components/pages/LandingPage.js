import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from '../menu/Menu.js'
import MasterGauge from '../charts/Gauge.jsx'
import store from '../../data/Store'
import _ from 'underscore'
import { stack as Menu2 } from 'react-burger-menu'

export default class Master extends Component {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      loading: false
    }
  }

  componentWillMount () { }

  componentDidUpdate () { }

  componentDidMount () { }

  render () {
    var styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }

    return (
      <div className='container'>
        <div className='section'>

          <div className='columns'>
            <Menu url={this.props.location.pathname}/>
            <div className="column is-3">

              <div className="column has-text">
                Refreshing Siam is in progress
              </div>
            </div>
          </div>

        </div>
      </div>)

  }
}