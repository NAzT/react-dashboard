import AppConstants from './Constants'
import Dispatcher from './Dispatcher'
import API from '../api/api.sensor.prod'

const startGetSensorData = () => {
  Dispatcher.dispatch({
    type: AppConstants.START_GET_DATA
  })

}

export {
  startGetSensorData
}