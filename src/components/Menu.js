import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
//import { menuItems } from '../data/menuItems'
import store from '../flux/Store'
import uuid from 'uuid'

export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentUrl: props.url,
      activeMenu: {
        backgroundColor: 'hsl(217, 71%, 50%)',
        color: 'white'
      },
      activeSubMenu: {
        color: '#4468B0'
      },
      masterMenuItems: [],
      nodeMenuItems: []
    }
  }

  _processStore = () => {
    this.setState({masterMenuItems: store.menu.masterMenuItems, nodeMenuItems: store.menu.nodeMenuItems})
  }

  componentWillMount () {
    store.addListener(() => {
      console.log('hello store has updates')
      this._processStore()
    })

    if (store.menu.length !== 0) {
      this._processStore()
    }
  }

  render () {

    const BoldSpan = styled.span`
      font-weight: bold;
      font-family: 'Kanit', sans-serif;
    `

    return (
      <aside className='menu'>

        <p className='menu-label'>
          Master
        </p>
        <ul className='menu-list'>
          {
            this.state.masterMenuItems.map(menuItem => {
              return (
                <li key={uuid()}>
                  <NavLink activeStyle={this.state.activeSubMenu} to={menuItem.url}>
                    <BoldSpan><i className={menuItem.icon}/> {menuItem.name}</BoldSpan>
                  </NavLink>
                </li>
              )
            })
          }

        </ul>

        <p className='menu-label'>
          Nodes
        </p>
        <ul className='menu-list'>
          {
            this.state.nodeMenuItems.map(menuItem => {

              const group = []
              let nodes = []

              menuItem.children.forEach(subMenu => { // render sub menu

                nodes.push(
                  <li key={uuid()}>
                    <NavLink activeStyle={this.state.activeSubMenu} to={subMenu.url}>
                      <BoldSpan><i className='fa fa-code-fork'/> {subMenu.name}</BoldSpan>
                    </NavLink>
                  </li>
                )

              })

              group.push( // render menu
                <li key={uuid()}>
                  <NavLink activeStyle={this.state.activeMenu} to={menuItem.url}>
                    <BoldSpan><i className={menuItem.icon}/> {menuItem.name}</BoldSpan>
                  </NavLink>
                  <ul>
                    {
                      nodes.map(node => node)
                    }
                  </ul>
                </li>
              )

              return group

            })
          }
        </ul>
      </aside>
    )

  }
}
