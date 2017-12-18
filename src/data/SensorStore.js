import { Store } from 'flux/utils'
import AppDispatcher from '../helpers/Dispatcher'
import AppConstants from '../helpers/Constants'

class MyStore extends Store {
  constructor (props) {
    super(props)
    this.sensor_data = {}
    this.sensor_stations = []
  }

  __onDispatch (action) {
    if (action.type === AppConstants.DONE_GET_DATA) {
      Object.assign(this.sensor_data, action.data)
      this.__emitChange()
    }
    else if (action.type === AppConstants.GOT_SENSOR_DATA) {
      action.data.forEach((station, idx) => {
        this.sensor_stations[idx] = station
        if (idx === action.data.length - 1) {
          this.__emitChange()
        }
      })
    }
  }

}

export default new MyStore(AppDispatcher)
