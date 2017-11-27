import dispatcher from './DataDispatcher'

import { Store } from 'flux/utils'
import AppDispatcher from './DataDispatcher'

const data = {}

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.data = data

  }
  
  // override __ondispatch
  __onDispatch (payload) {

  }

  setState (k, v) {
    this.data[k] = v
    this.__emitter.emit(this.__changeEvent)
  }

  getState () {
    return this.data
  }

}

const store = new MyStore(AppDispatcher)

export default store