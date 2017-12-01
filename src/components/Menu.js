import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
//import { menuItems } from '../data/menuItems'
import store from '../flux/stores/Menu'
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
      menuItems: []
    }
  }

  componentWillMount () {
    store.addListener(() => {
      this.setState({menuItems: store.state})
      //console.log(this.state.menuItems)
      console.log('==== store menu ', store.state)
      //console.log(`=== state`, store.state)
    })
  }

  render () {

    const BoldSpan = styled.span`
      font-weight: bold;
      font-family: 'Kanit', sans-serif;
    `

    return (
      <aside className='menu'>
        <p className='menu-label'>
          Lab
        </p>
        <ul className='menu-list'>
          {
            this.state.menuItems.map(menuItem => {

              const master = []
              let nodes = []

              console.log('=== menuItem', menuItem)

              menuItem.children.forEach(subMenu => { // render sub menu

                console.log('=== menuItem', menuItem)

                nodes.push (
                  <li key={uuid()}>
                    <NavLink activeStyle={this.state.activeSubMenu} to={subMenu.url}>
                      <BoldSpan><i className='fa fa-code-fork'/> {subMenu.name}</BoldSpan>
                    </NavLink>
                  </li>
                )

              })

              master.push ( // render menu
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

              return master

            })
          }

        </ul>
      </aside>
    )

  }
}
