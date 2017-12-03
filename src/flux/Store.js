import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

let menu = {
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
}

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.menu = menu
    this.state = []
    this.SENSOR_NODES = {}
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      Object.assign(this.menu, action.data)
      this.__emitChange()
    }
    else if (action.type === AppConstants.DONE_GET_MENU) {
      console.log('done get menu')
      Object.assign(this.menu, action.data)
      this.__emitChange()
    }
    else if (action.type === AppConstants.SENSOR_NODE_COMING) {
      this.SENSOR_NODES[action.data.name] = action.data.value
      console.log('incomming data ... ', this.SENSOR_NODES)
    }
  }

}

export default new MyStore(AppDispatcher)
