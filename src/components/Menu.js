import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'
import store from '../data/Store'
import uuid from 'uuid'
import { stack as Menu2 } from 'react-burger-menu'

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
    const styles = {
      activeMenu: {
        backgroundColor: 'hsl(217, 71%, 50%)',
        color: 'white'
      },
      activeSubMenu: {
        color: '#4468B0'
      }
    }
    const BoldSpan = styled.span`
      font-weight: bold;
      font-family: 'Kanit', sans-serif;
    `

    return (<aside className='menu'>
      <ul className='menu-list'>
        {
          this.state.group1.map(menuItem =>
            <li key={uuid()}>
              <NavLink activeStyle={styles.activeSubMenu} to={menuItem.url}>
                <BoldSpan><i className={menuItem.icon}/> {menuItem.name}</BoldSpan>
              </NavLink>
              <ul>
                {
                  menuItem.children.map(subMenu =>
                    <li key={uuid()}>
                      <NavLink activeStyle={styles.activeSubMenu} to={subMenu.url}>
                        <BoldSpan><i className='fa fa-code-fork'/> {subMenu.name}</BoldSpan>
                      </NavLink>
                    </li>)
                }
              </ul>
            </li>
          )
        }

      </ul>

      <p className='menu-label'>
        {/*Nodes*/}
      </p>
      <ul className='menu-list'>
        {
          this.state.group2.map(menuItem =>
            <li key={uuid()}>
              <NavLink activeStyle={this.state.activeMenu} to={menuItem.url}>
                <BoldSpan><i className={menuItem.icon}/> {menuItem.name}</BoldSpan>
              </NavLink>
            </li>)
        }
      </ul>
    </aside>)

  }
}
