import TypeActions from '../helpers/Constants'
import Dispatcher from '../helpers/Dispatcher'
import _ from 'underscore'
import Paho from '../mqttws31'
import store from '../data/MqttStore'

const _mapValue = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}
const SENSOR_NODES = {}
const SENSOR_DATA = {}
let MASTER_DATA = {}
export default () => {
  const hostname = 'mqtt.cmmc.io'
  const port = 9001
  const clientId = `clientId-${Math.random() * 100}`

  let client = new Paho.MQTT.Client(hostname, port, clientId)
  let shouldUpdateGraph = false

  console.log('connecting mqtt...')

  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived
  client.connect({onSuccess: onConnect})

  function onConnect () {
    console.log('onConnect...')
    client.subscribe('NDTH/#')
  }

  function onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost: ' + responseObject.errorMessage)
      client.connect({onSuccess: onConnect})
    }
  }

  let topicMapping = {
    'NDTH/NAQ126101': {id: 1},
    'NDTH/NAQ126070': {id: 2},
    'NDTH/MCTH007/status': {id: 3},
    'NDTH/MCTH006/status': {id: 4},
  }

  function onMessageArrived (message) {
    const data = JSON.parse(message.payloadString)
    Dispatcher.dispatch({
      type: TypeActions.MQTT_MESSAGE_ARRIVED,
      data: {id: topicMapping[message.destinationName].id, d: data}
    })

  }
}