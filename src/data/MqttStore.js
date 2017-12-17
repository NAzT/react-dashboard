import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

class MqttStore extends Store {
  constructor (props) {
    super(props)
  }

  __onDispatch (action) {
    console.log('__onDispatch', action)
  }

}

export default new MqttStore(AppDispatcher)
