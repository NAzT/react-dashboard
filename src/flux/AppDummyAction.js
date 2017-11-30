import AppConstants from './Constants'
import Dispatcher from './Dispatcher'
import API from '../api/api.sensor.prod'

const startGetSensorData = () => {
  Dispatcher.dispatch({
    type: AppConstants.START_GET_DATA
  })

  API.CLOUD_FUNCTIONS((DATA) => {
    Dispatcher.dispatch({
      type: AppConstants.DONE_GET_DATA,
      data: DATA
    })
  })
}

export {
  startGetSensorData
}