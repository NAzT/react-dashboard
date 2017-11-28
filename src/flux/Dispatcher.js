'use strict'

import { Dispatcher } from 'flux'
// import AppConstants from './Constants'
// import ApplicationStore from './Store'
// import { startGetData } from './AppActions'

const dispatcher = new Dispatcher
//
// dispatcher.register(action => {
//   if (action.type === AppConstants.START_GET_DATA) {
//     startGetData()
//   }
//   else if (action.type === AppConstants.DONE_GET_DATA) {
//     ApplicationStore.('sensor', action.data)
//   }
//
// })
export default dispatcher