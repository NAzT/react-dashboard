import { Store } from 'flux/utils'
import AppDispatcher from '../helpers/Dispatcher'
import AppConstants from '../helpers/Constants'

class MenuStore extends Store {
  constructor (props) {
    super(props)
    const menu = {
      group1: [{
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
      group2: [
        {
          'id': 5,
          'url': '/about',
          'name': 'เกี่ยวกับโครงการ',
          'icon': 'fa fa-envira',
          'children': []
        }
      ]
    }
    this.menu = menu
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_MENU) {
      Object.assign(this.menu, action.data)
      this.__emitChange()
    }
    else if (action.type === AppConstants.GOT_MENU_UPDATES) {
      Object.assign(this.menu.group2[0].children, action.data)
      Object.assign(this.menu.group2[1].children, action.data)
      Object.assign(this.menu.group1[0].children, action.data)
      this.__emitChange()
    }
  }

}

export default new MenuStore(AppDispatcher)
