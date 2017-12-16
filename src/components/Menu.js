import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
import store from '../data/Store'
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

    store.addListener(() => {
      this._processStore()
    })

  }

  _processStore = () => {
    this.setState({masterMenuItems: store.menu.master, nodeMenuItems: store.menu.nodes})
  }

  componentWillMount () {
    this._processStore()
  }

  render () {

    const BoldSpan = styled.span`
      font-weight: bold;
      font-family: 'Kanit', sans-serif;
    `

    return (
      <aside className='menu'>

        <p className='menu-label'>
          {/*Master*/}
        </p>
        <ul className='menu-list'>
          {
            this.state.masterMenuItems.map(menuItem => {

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

              return (
                <li key={uuid()}>
                  <NavLink activeStyle={this.state.activeSubMenu} to={menuItem.url}>
                    <BoldSpan><i className={menuItem.icon}/> {menuItem.name}</BoldSpan>
                  </NavLink>
                  <ul>
                    {
                      nodes.map(node => node)
                    }
                  </ul>
                </li>
              )
            })
          }

        </ul>

        <p className='menu-label'>
          {/*Nodes*/}
        </p>
        <ul className='menu-list'>
          {
            this.state.nodeMenuItems.map(menuItem => {

              const group = []

              group.push( // render menu
                <li key={uuid()}>
                  <NavLink activeStyle={this.state.activeMenu} to={menuItem.url}>
                    <BoldSpan><i className={menuItem.icon}/> {menuItem.name}</BoldSpan>
                  </NavLink>
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
