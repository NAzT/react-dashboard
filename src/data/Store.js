import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

const menu = {
  master: [{
    'url': '/',
    'name': 'โครงการ Refresh Siam',
    'icon': 'fa fa-pie-chart',
    'children':
      [
        {id: 1, name: 'ห้องสมุดคณะวิศวฯ', url: '/node/1', topic: 'NDTH/NAQ126101'},
        {id: 2, name: 'อาคารมั่นคงเคหะการ', url: '/node/2', topic: 'NDTH/NAQ126070'},
        {id: 3, name: 'สุขุมวิท-พระราม 4', url: '/node/3', topic: 'NDTH/MCTH007/status'},
        {id: 4, name: 'ตึกสำรวจ คณะวิศวฯ', url: '/node/4', topic: 'NDTH/MCTH006/status'},
      ]
  }],
  nodes: [
    {
      'id': 5,
      'url': '/about',
      'name': 'เกี่ยวกับโครงการ',
      'icon': 'fa fa-envira',
      'children': []
    }
  ]
}

class MyStore extends Store {
  constructor (props) {
    super(props)
    this.menu = menu
    this.sensor_data = {}
    this.master_data = {}
    this.sensor_stations = []
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      Object.assign(this.sensor_data, action.data)
      Object.assign(this.master_data, action.master)
      this.__emitChange()
    }
    else if (action.type === AppConstants.DONE_GET_MENU) {
      Object.assign(this.menu, action.data)
      this.__emitChange()
    }
    else if (action.type === AppConstants.GOT_MENU_UPDATES) {
      Object.assign(this.menu.nodes[0].children, action.data)
      Object.assign(this.menu.nodes[1].children, action.data)
      Object.assign(this.menu.master[0].children, action.data)
      this.__emitChange()
    }
    else if (action.type === AppConstants.GOT_SENSOR_DATA) {
      action.data.forEach((station, idx) => {
        this.sensor_stations[idx] = station
        if (idx === action.data.length - 1) {
          this.__emitChange()
        }
      })
    }
  }

}

export default new MyStore(AppDispatcher)
