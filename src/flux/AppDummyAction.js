import AppConstants from './Constants'
import Dispatcher from './Dispatcher'
import API from '../api/api.sensor.mock'

const startGetSensorData = () => {
  Dispatcher.dispatch({
    type: AppConstants.START_GET_DATA
  })

  API.getSensorData((data) => {
    Dispatcher.dispatch({
      type: AppConstants.DONE_GET_DATA,
      data: data
    })
  })
}

export {
  startGetSensorData
}