import { Store } from 'flux/utils'
import AppDispatcher from '../Dispatcher'
import ActionTypes from '../Constants'

let state = []

class Menu extends Store {

  constructor (props) {
    super(props)
    this.state = state
  }

  __onDispatch (action) {

    if (action.type === ActionTypes.DONE_GET_MENU) {

      this.state = action.data

      //('>>>> store menu', action.data)

      this.__emitChange()

    }

  }

}

export default new Menu(AppDispatcher)