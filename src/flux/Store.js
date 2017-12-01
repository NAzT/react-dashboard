import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

let state = {
  menu: []
}

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = state
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      //Object.assign(this.state, action.data)
      this.state.menu = action.data
      console.log('========== store ', state)
      this.__emitChange()
    }
  }

}

export default new MyStore(AppDispatcher)
