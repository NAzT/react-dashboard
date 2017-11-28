import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

const state = {
  environment: {},
  gas: {},
  recycle: {},
  battery: {},
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
      this.state.data = action.data.data
      Object.assign(this.state, action.data)
      console.log(this.state)
      this.__emitChange()
    }
  }

}

export default new MyStore(AppDispatcher)
