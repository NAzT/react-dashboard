import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'
import _ from 'underscore'

let menu = {
  master: [],
  nodes: []
}

class MyStore extends Store {
  constructor (props) {
    super(props)
    this.menu = menu
    this.state = []
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      Object.assign(this.menu, action.data)
      this.__emitChange()
    }
    else if (action.type === AppConstants.DONE_GET_MENU) {
      this.menu.master = action.data.master
      this.menu.nodes = action.data.nodes
      this.__emitChange()
    }
    else if (action.type === AppConstants.GOT_MENU_UPDATES) {
      this.menu.nodes[0].children = _.clone(action.data)
      this.__emitChange()
    }

  }

}

export default new MyStore(AppDispatcher)
