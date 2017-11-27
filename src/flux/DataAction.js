//
import { data } from '../data/dummyCharts'
import AppDispatcher from './DataDispatcher'
import ApplicationStore from './MyStore'

const DataActionTypes = {
  START_GET_DATA: 'START_GET_DATA',
  DONE_GET_DATA: 'DONE_GET_DATA'
}

AppDispatcher.register(action => {
  if (action.type === DataActionTypes.START_GET_DATA) {
    setInterval(() => {
      AppDispatcher.dispatch({
        type: DataActionTypes.DONE_GET_DATA,
        data: data.generate.data()
      })
    }, 1000)
  }
  else if (action.type === DataActionTypes.DONE_GET_DATA) {
    ApplicationStore.setState('sensor', action.data)
  }

})

const APIAction = {
  startGetData () {
    AppDispatcher.dispatch({
      type: DataActionTypes.START_GET_DATA,
      data: undefined
    })
  }
}

export { APIAction, DataActionTypes }