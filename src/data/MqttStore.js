import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import AppConstants from './Constants'

class MqttStore extends Store {
  constructor (props) {
    const defaultState = {
      temperature: 0,
      humidity: 0,
      pm10: 0
    }
    super(props)
    this.state = {
      1: defaultState,
      2: defaultState,
      3: defaultState,
      4: defaultState,
      5: defaultState,
    }
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
