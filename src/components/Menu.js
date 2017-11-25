import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                  <Link to={menu.url} style={this.matchUrl(menu.url)}>
                    <BoldSpan><i className={menu.icon}/> {menu.name}</BoldSpan>
                  </Link>
                  <ul>
                    {
                      menu.children.map((child) => {
                        return (
                          <li key={child.id}>
                            <Link to={child.url} style={this.matchUrl(child.url)}>
                              <BoldSpan>{child.name}</BoldSpan>
                            </Link>
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
