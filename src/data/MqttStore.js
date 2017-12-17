import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

class MqttStore extends Store {
  constructor (props) {
    super(props)
    this.state = {}
  }

  __onDispatch (action) {
    console.log('__onDispatch', action)
    if (action.type === AppConstants.MQTT_MESSAGE_ARRIVED) {
      this.state[action.data.id] = action.data.d
      console.log(this.state)
      this.__emitChange()
    }
  }

}

export default new MqttStore(AppDispatcher)
