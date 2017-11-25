import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma/css/bulma.css'
import Environment from './components/Environment'
import Gas from './components/Gas'
import Toilet from './components/Toilet'
import Bedroom from './components/Bedroom'

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
      <Route exact path='/' component={Environment}/>
      <Route exact path='/environment' component={Environment}/>
      <Route exact path='/gas' component={Gas}/>
      <Route exact path='/toilet' component={Toilet}/>
      <Route exact path='/bedroom' component={Bedroom}/>
      <Route component={PageNotFound}/>
    </Switch>
  </HashRouter>
)

ReactDOM.render(Main, document.getElementById('app'))
