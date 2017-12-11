import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'bulma/css/bulma.css'
import Master from './components/Master'
import Environment from './components/Environment'
import Battery from './components/Battery'
import NodeTemplate from './components/NodeTemplate'

import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'
import API from './api/prod.mqtt'

// API()

// const menu = {
//   master: [{
//     'url': '/',
//     'name': 'CMMC',
//     'icon': 'fa fa-pie-chart',
//     'children':
//       [{id: 0, name: 'BME280-ID-01', url: '/node/BME280-ID-01'}, {
//         id: 1,
//         name: 'BAT8285-ID-01',
//         url: '/node/BAT8285-ID-01'
//       }, {id: 2, name: 'BME280-ID-02', url: '/node/BME280-ID-02'}, {
//         id: 3,
//         name: 'SHT31-ID-01',
//         url: '/node/SHT31-ID-01'
//       }, {id: 4, name: 'LATTE-ID-01', url: '/node/LATTE-ID-01'}]
//   }],
//   nodes: [{
//     'id': 1,
//     'url': '/environment',
//     'name': 'สภาพแวดล้อม',
//     'icon': 'fa fa-envira',
//     'children': []
//   }, {
//     'id': 2,
//     'url': '/battery',
//     'name': 'แบตเตอรี่',
//     'icon': 'fa fa-battery-three-quarters',
//     'children': []
//   }]
// }
//
// setTimeout(function () {
//   Dispatcher.dispatch({
//     type: TypeActions.DONE_GET_MENU,
//     data: menu
//   })
// }, 1000)

const PageNotFound = ({location}) => (
  <div className="container">
    <div className="section">
      <p className='title'>Sorry page not found <code>{location.pathname}</code></p>
    </div>
  </div>
)

const Main = (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Master}/>
      <Route exact path='/environment' component={Environment}/>
      <Route exact path='/node/:id' component={NodeTemplate}/>
      <Route exact path='/battery' component={Battery}/>
      <Route component={PageNotFound}/>
    </Switch>
  </HashRouter>
)

ReactDOM.render(Main, document.getElementById('app'))
