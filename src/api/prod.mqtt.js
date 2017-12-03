import axois from 'axios'
import paho_mqtt from 'paho-mqtt/mqttws31'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

const _mapValue = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}
const SENSOR_NODES = {}
export default (callback) => {

  const Paho = paho_mqtt
  const hostname = 'mqtt.cmmc.io'
  const port = 9001
  const clientId = `clientId-${Math.random() * 100}`

  let client = new Paho.MQTT.Client(hostname, port, clientId)
  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived
  client.connect({onSuccess: onConnect})

  function onConnect () {
    console.log('onConnect')
    client.subscribe('CMMC/NB-IOT/#')
    // message = new Paho.MQTT.Message('Hello')
    // message.destinationName = '/World'
    // client.send(message)
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
    SENSOR_NODES[sensor_node.device_name] = sensor_node
    console.log(SENSOR_NODES)
    // message = JSON.parse(message.payloadString)
    // Dispatcher.dispatch({
    //   type: TypeActions.DONE_GET_DATA,
    //   data: convertData
    // })
  }

}