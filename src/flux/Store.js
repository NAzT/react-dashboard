import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

class MyStore extends Store {
  constructor (props) {
    super(props)
    this.menu = {master: [], nodes: []}
    this.sensor_data = {}
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      Object.assign(this.sensor_data, action.data)
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
