import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma/css/bulma.css'
import Environment from './components/Environment'
import Gas from './components/Gas'
import Battery from './components/Battery'
import Trash from './components/Trash'
import NodeTemplate from './components/NodeTemplate'

// import Debug from './Debug'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'
import API from './api/api.sensor.prod'

API.CLOUD_FUNCTIONS.MENU((DATA) => {
  Dispatcher.dispatch({
    type: TypeActions.DONE_GET_MENU,
    data: DATA
  })
})

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
      <Route exact path='/environment/node/:id' component={NodeTemplate}/>
      <Route exact path='/gas' component={Gas}/>
      <Route exact path='/gas/node/:id' component={NodeTemplate}/>
      <Route exact path='/battery' component={Battery}/>
      <Route exact path='/battery/node/:id' component={NodeTemplate}/>
      <Route exact path='/trash' component={Trash}/>
      <Route exact path='/trash/node/:id' component={NodeTemplate}/>
      <Route component={PageNotFound}/>
    </Switch>
  </HashRouter>
)

ReactDOM.render(Main, document.getElementById('app'))
