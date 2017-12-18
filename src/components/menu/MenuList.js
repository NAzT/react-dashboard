import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
import MenuItem from './MenuItem.jsx'

export default class MenuList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      group: props.menu || []
    }
  }

  componentDidMount () { }

  render () {
    return (
      <ul className='menu-list'>
        {
          this.state.group.map(root =>
            <li key={uuid()}>
              <MenuItem key={uuid()} url={root.url} name={root.name}/>
              <ul>
                {root.children.map(item => <MenuItem key={uuid()} url={item.url} name={item.name}/>)}
              </ul>
            </li>)
        }
      </ul>
    )
  }
}

