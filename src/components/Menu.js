import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'

export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentUrl: props.url
    }
  }

  render () {

    const StyledSpan = styled.span`
      font-weight: bold;
    `

    const matchUrl = (url) => {
      const {currentUrl} = this.state
      if (url === currentUrl) {
        return {
          backgroundColor: 'hsl(217, 71%, 53%)',
          color: 'white'
        }
      }
    }

    return (
      <aside className='menu'>
        <p className='menu-label'>
          General
        </p>
        <ul className='menu-list'>
          <Link to='/environment' style={matchUrl('/environment')}>
            <li><StyledSpan><i className='fa fa-envira'/> Environment</StyledSpan></li>
          </Link>
          <Link to='/gas' style={matchUrl('/gas')}>
            <li><StyledSpan><i className='fa fa-flask'/> Gas</StyledSpan></li>
          </Link>
          <Link to='/toilet' style={matchUrl('/toilet')}>
            <li><StyledSpan><i className='fa fa-shower'/> Toilet</StyledSpan></li>
          </Link>
          <Link to='/bedroom' style={matchUrl('/bedroom')}>
            <li><StyledSpan><i className='fa fa-bed'/> Bedroom</StyledSpan></li>
          </Link>
        </ul>
      </aside>
    )

  }
}
