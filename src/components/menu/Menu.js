import React, { Component } from 'react'
import store from '../../data/Store'
import MenuList from './MenuList'

export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      group1: [],
      group2: [],
    }
  }

  _processStore = () => {
    this.setState({group1: store.menu.group1, group2: store.menu.group2})
  }

  componentWillMount () {
    this._processStore()
    store.addListener(() => {
      this._processStore()
    })
  }

  render () {
    return (
      <aside className='menu'>
        <MenuList menu={this.state.group1}/>
        <MenuList menu={this.state.group2}/>
      </aside>
    )
  }
}
