import AppConstants from './Constants'
import Dispatcher from './Dispatcher'
import { data } from '../data/dummyCharts'

function startGetData () {
  const action = {
    type: AppConstants.START_GET_DATA,
    data: undefined
  }

  Dispatcher.dispatch(action)

  setTimeout(() => {
    Dispatcher.dispatch({
      type: AppConstants.DONE_GET_DATA,
      data: data.generator.data()
    })
  }, 1000)

}

export {
  startGetData
}