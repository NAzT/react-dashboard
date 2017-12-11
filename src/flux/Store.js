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
        {id: 0, name: 'ห้องสมุดคณะวิศวฯ', url: '/node/SHT31-ID-01'},
        {id: 1, name: 'อาคารมั่นคงเคหะการ', url: '/node/LATTE-ID-01'},
        {id: 2, name: 'สุขุมวิท-พระราม 4', url: '/node/BME280-ID-01'},
        {id: 3, name: 'ตึกสำรวจ คณะวิศวฯ', url: '/node/BAT8285-ID-01'},
      ]
  }],
  nodes: [
    {
      'id': 1,
      'url': '/environment',
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
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      Object.assign(this.sensor_data, action.data)
      Object.assign(this.master_data, action.master)
      //console.log('this.sensor_data', this.sensor_data)
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

  }

}

export default new MyStore(AppDispatcher)
