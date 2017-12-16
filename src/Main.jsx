import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'bulma/css/bulma.css'
import Node from './components/pages/Node'

import MQTT_API from './api/prod.mqtt'
import HTTP_API from './api/prod.cloud.function'
import LandingPage from './components/pages/LandingPage'

HTTP_API()
MQTT_API()

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
      <Route exact path='/about' component={LandingPage}/>
      <Route exact path='/node/:id' component={Node}/>
      <Route component={PageNotFound}/>
    </Switch>
  </HashRouter>
)

ReactDOM.render(Main, document.getElementById('app'))
