import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bulma/css/bulma.css';
import Master from './components/Master';
import Environment from './components/Environment';
import Battery from './components/Battery';
import NodeTemplate from './components/NodeTemplate';

import Dispatcher from './flux/Dispatcher';
import TypeActions from './flux/Constants';
import API from './api/prod.mqtt';

API((DATA) => {
    console.log(DATA);
});

var menu = {
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
};

Dispatcher.dispatch({
    type: TypeActions.DONE_GET_MENU,
    data: menu
});

const PageNotFound = ({location}) => (
  <div className="container">
      <div className="section">
          <p className='title'>Sorry page not found <code>{location.pathname}</code></p>
      </div>
  </div>
);

const Main = (
  <HashRouter>
      <Switch>
          <Route exact path='/' component={Master}/>
          <Route exact path='/environment' component={Environment}/>
          <Route exact path='/environment/node/:id' component={NodeTemplate}/>
          <Route exact path='/battery' component={Battery}/>
          <Route exact path='/battery/node/:id' component={NodeTemplate}/>
          <Route component={PageNotFound}/>
      </Switch>
  </HashRouter>
);

ReactDOM.render(Main, document.getElementById('app'));
