import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
import store from '../../data/Store'
import uuid from 'uuid'
import { stack as Menu2 } from 'react-burger-menu'
import MenuList from './MenuList'

export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentUrl: props.url,
      group1: [],
      group2: [],
    }

    store.addListener(() => {
      this._processStore()
    })
  }

  _processStore = () => {
    this.setState({group1: store.menu.group1, group2: store.menu.group2})
  }

  componentWillMount () {
    this._processStore()
  }

  render () {
    return (<aside className='menu'>
      <MenuList menu={this.state.group1}/>
      <MenuList menu={this.state.group2}/>
    </aside>)

  }
}
