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
import LandingPage from './components/LandingPage'

// API()
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
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/environment' component={Environment}/>
      <Route exact path='/node/:id' component={NodeTemplate}/>
      <Route exact path='/battery' component={Battery}/>
      <Route component={PageNotFound}/>
    </Switch>
  </HashRouter>
)

ReactDOM.render(Main, document.getElementById('app'))
