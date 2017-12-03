import axois from 'axios'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'
import _ from 'underscore'
import Paho from '../mqttws31'

const _mapValue = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}
const SENSOR_NODES = {}
export default (callback) => {

  const hostname = 'mqtt.cmmc.io'
  const port = 9001
  const clientId = `clientId-${Math.random() * 100}`

  let client = new Paho.MQTT.Client(hostname, port, clientId)
  console.log(client)
  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived
  client.connect({onSuccess: onConnect})

  function onConnect () {
    console.log('onConnect...')
    client.subscribe('CMMC/NB-IOT/#')
  }

  function onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage)
    }
  }

  function onMessageArrived (message) {
    console.log('onMessageArrived:' + message.payloadString)
    const data = JSON.parse(message.payloadString)
    const sensor_node = data.cmmc_packet.sensor_node
    SENSOR_NODES[sensor_node.device_name] = data.cmmc_packet.sensor_node
    // console.log(SENSOR_NODES)

    // Dispatcher.dispatch({
    //   type: TypeActions.SENSOR_NODE_COMING,
    //   data: {name: sensor_node.device_name, value: sensor_node}
    // })

  }

  setInterval(function () {
    const subNodes = []
    _.keys(SENSOR_NODES).forEach((k, idx) => {
      console.log(idx, k)
      subNodes.push({
        id: idx, name: k, url: `/environment/node/${SENSOR_NODES[k].from}`
      })
    })

    Dispatcher.dispatch({
      type: TypeActions.GOT_MENU_UPDATES,
      data: subNodes,
    })

  }, 2000)

}