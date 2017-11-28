import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

const state = {
  data: [],
  labels: []
}

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = state
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      this.state.labels = action.data.labels
      this.state.data = action.data.data
      this.__emitChange()
    }
  }

}

export default new MyStore(AppDispatcher)
