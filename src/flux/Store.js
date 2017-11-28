import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

const state = {}

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = state
  }

  __onDispatch (action) {
    if (action.type === AppConstants.START_GET_DATA) {
      this.state.loading = true
      this.__emitChange()
    }
    else if (action.type === AppConstants.DONE_GET_DATA) {
      this.state.loading = false
      this.state.sensor = action.data
      this.__emitChange()
    }
  }

}

export default new MyStore(AppDispatcher)
