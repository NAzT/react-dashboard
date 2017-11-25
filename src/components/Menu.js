import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
import { menuItems } from '../data/menuItems'

export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentUrl: props.url
    }
    console.log('props: ', props)
  }

  matchUrl = (url) => {
    const {currentUrl} = this.state
    console.log(`currentUrl: ${currentUrl}, url: ${url}`)
    // debugger;

    if (url === currentUrl) {
      //console.log(`=== matched: ${url}`)

      let t = url.split('/', 2)[1]
      console.log(`>>>>>>>>>>>>>>>> ${t}`)

      return {
        backgroundColor: 'hsl(217, 71%, 53%)',
        color: 'white'
      }
    }
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
                  <NavLink activeStyle={{
                    backgroundColor: 'hsl(217, 71%, 40%)',
                    color: 'white'
                  }} to={menu.url}>
                    <BoldSpan><i className={menu.icon}/> {menu.name}</BoldSpan>
                  </NavLink>
                  <ul>
                    {
                      menu.children.map((child) => {
                        return (
                          <li key={child.id}>
                            <NavLink activeStyle={{
                              backgroundColor: 'hsl(217, 71%, 50%)',
                              color: 'white'
                            }} to={child.url}>
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
