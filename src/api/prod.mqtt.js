import axois from 'axios'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'
import _ from 'underscore'
import Paho from '../mqttws31'

const _mapValue = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}
const SENSOR_NODES = {}
const SENSOR_DATA = {}
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
    if (_.isUndefined(SENSOR_NODES[sensor_node.device_name])) {
      SENSOR_NODES[sensor_node.device_name] = data.cmmc_packet.sensor_node
      SENSOR_DATA[sensor_node.from] = {
        temperature: {
          chart: {
            data: [data.cmmc_packet.sensor_node.field1],
            labels: [1],
          }
        },
        humidity: {
          chart: {
            data: [data.cmmc_packet.sensor_node.field2],
            labels: [1],
          }
        }
      }
    }
    else {
      SENSOR_DATA[sensor_node.from].temperature.chart.data.push(sensor_node.field1)
      SENSOR_DATA[sensor_node.from].humidity.chart.data.push(sensor_node.field2)

      SENSOR_DATA[sensor_node.from].temperature.chart.labels = [...SENSOR_DATA[sensor_node.from].temperature.chart.data]
      SENSOR_DATA[sensor_node.from].humidity.chart.labels = [...SENSOR_DATA[sensor_node.from].humidity.chart.data]
    }
  }

  setInterval(function () {
    const subNodes = []
    _.keys(SENSOR_NODES).forEach((k, idx) => {
      subNodes.push({
        id: idx, name: k, url: `/environment/node/${SENSOR_NODES[k].from}`
      })
    })

    Dispatcher.dispatch({
      type: TypeActions.GOT_MENU_UPDATES,
      data: subNodes,
    })

    Dispatcher.dispatch({
      type: TypeActions.DONE_GET_DATA,
      data: SENSOR_DATA,
    })

  }, 2000)

}