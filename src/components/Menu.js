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
      },
      activeSubMenu: {
        color: '#4468B0'
      }
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
          Lab
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
                            <NavLink activeStyle={this.state.activeSubMenu} to={child.url}>
                              <BoldSpan><i className='fa fa-code-fork' /> {child.name}</BoldSpan>
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
