import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
import { menuItems } from '../data/menuItems'

export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentUrl: props.url,
      activeMenu: {
        backgroundColor: 'hsl(217, 71%, 50%)',
        color: 'white'
      }
    }
    console.log('props: ', props)
  }

  render () {

    const BoldSpan = styled.span`
      font-weight: bold;
    `

    return (
      <aside className='menu'>
        <p className='menu-label'>
          General
        </p>
        <ul className='menu-list'>
          {
            menuItems.map(menu => {
              return (
                <li key={menu.id}>
                  <NavLink activeStyle={this.state.activeMenu} to={menu.url}>
                    <BoldSpan><i className={menu.icon}/> {menu.name}</BoldSpan>
                  </NavLink>
                  <ul>
                    {
                      menu.children.map((child) => {
                        return (
                          <li key={child.id}>
                            <NavLink activeStyle={this.state.activeMenu} to={child.url}>
                              <BoldSpan>{child.name}</BoldSpan>
                            </NavLink>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }

        </ul>
      </aside>
    )

  }
}
