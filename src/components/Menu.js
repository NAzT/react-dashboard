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
    this.setState({
      masterMenuItems: [{
        'url': '/',
        'name': 'CMMC',
        'icon': 'fa fa-pie-chart'
      }],
      nodeMenuItems: [{
        'id': 1,
        'url': '/environment',
        'name': 'สภาพแวดล้อม',
        'icon': 'fa fa-envira',
        'children': [{
          'id': 1,
          'name': 'อุณหภูมิ หน้าชมรม',
          'url': '/environment/node/1'
        }, {
          'id': 2,
          'name': 'ความชื้น ห้องชมรมชั้น 2',
          'url': '/environment/node/2'
        }, {
          'id': 3,
          'name': 'เสียง ห้องชมรมชั้น 3',
          'url': '/environment/node/3'
        }, {
          'id': 4,
          'name': 'ความกดอากาศ โกดัง',
          'url': '/environment/node/4'
        }]
      }, {
        'id': 2,
        'url': '/battery',
        'name': 'แบตเตอรี่',
        'icon': 'fa fa-battery-three-quarters',
        'children': [{
          'id': 1,
          'name': 'เครื่อง หน้าชมรม',
          'url': '/battery/node/1'
        }, {
          'id': 2,
          'name': 'เครื่อง ห้องชมรมชั้น 2',
          'url': '/battery/node/2'

        }, {
          'id': 3,
          'name': 'เครื่อง ห้องชมรมชั้น 3',
          'url': '/battery/node/3'

        }, {
          'id': 4,
          'name': 'เครื่อง โกดัง',
          'url': '/battery/node/4'

        }]
      }]
    })
    console.log(this.state.masterMenuItems)
    console.log(this.state.nodeMenuItems)
    // debugger
  }

  componentWillMount () {
    store.addListener(() => {
      this._processStore()
      //console.log(this.state.masterMenuItems)
    })

    if (store.state.length !== 0) {
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
