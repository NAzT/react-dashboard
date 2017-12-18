import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid'
import 'font-awesome/css/font-awesome.css'
import styled from 'styled-components'

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
export default class MenuList extends Component {

  constructor (props) {
    super(props)
    console.log('propsss')
    console.log('props => ', props)
    this.state = {
      group: props.menu || []
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <ul className='menu-list'>
        {
          this.state.group.map(menuItem =>
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
            </li>)
        }

      </ul>
    )
  }
}

