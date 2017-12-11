import axios from 'axios'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

export default (callback) => {
  const basePath = '/data'
  const uris = ['1.json', '2.json', '3.json', '4.json']

  setInterval(() => {
    const promises = uris.map((uri) => axios.get(`${basePath}/${uri}`))
    axios.all(promises)
      .then(axios.spread((...results) => {
          Dispatcher.dispatch({
            type: TypeActions.GOT_SENSOR_DATA,
            data: results.map((v, idx) => v.data),
          })
       })
      )
  }, 2 * 1000)

}