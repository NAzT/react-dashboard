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
let MASTER_DATA = {}
export default () => {

  const hostname = 'mqtt.cmmc.io'
  const port = 9001
  const clientId = `clientId-${Math.random() * 100}`

  let client = new Paho.MQTT.Client(hostname, port, clientId)
  let shouldUpdateGraph = false

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

    MASTER_DATA = {
      temperature: data.temperature_c / 100,
      humidity: data.humidity_percent_rh / 100,
      gps_latitude: data.gps_latitude,
      gps_longitude: data.gps_longitude
    }

    if (_.isUndefined(SENSOR_NODES[sensor_node.device_name])) {
      SENSOR_NODES[sensor_node.device_name] = data.cmmc_packet.sensor_node
      SENSOR_DATA[sensor_node.device_name] = {
        temperature: {
          chart: {
            label: 'temperature',
            data: [data.cmmc_packet.sensor_node.field1 / 100],
            labels: [1]
          }
        },
        humidity: {
          chart: {
            label: 'humidity',
            data: [data.cmmc_packet.sensor_node.field2 / 100],
            labels: [1]
          }
        },
        battery: {
          //value: data.cmmc_packet.sensor_node.battery / 100
          value: _mapValue(data.cmmc_packet.sensor_node.battery, 0, 1000, 0, 100)
        }
      }
    }
    else {
      shouldUpdateGraph = true
      SENSOR_DATA[sensor_node.device_name].temperature.chart.data.push(sensor_node.field1 / 100)
      SENSOR_DATA[sensor_node.device_name].humidity.chart.data.push(sensor_node.field2 / 100)
      SENSOR_DATA[sensor_node.device_name].temperature.chart.labels = [...SENSOR_DATA[sensor_node.device_name].temperature.chart.data]
      SENSOR_DATA[sensor_node.device_name].humidity.chart.labels = [...SENSOR_DATA[sensor_node.device_name].humidity.chart.data]
    }
  }

  // setInterval(function () {
  //   const subNodes = []
  //   _.keys(SENSOR_NODES).forEach((k, idx) => {
  //     subNodes.push({
  //       id: idx, name: k, url: `/node/${SENSOR_NODES[k].device_name}`
  //     })
  //   })
  //
  //   Dispatcher.dispatch({
  //     type: TypeActions.GOT_MENU_UPDATES,
  //     data: subNodes
  //   })
  //
  //   if (shouldUpdateGraph) {
  //     shouldUpdateGraph = false
  //     Dispatcher.dispatch({
  //       type: TypeActions.DONE_GET_DATA,
  //       data: SENSOR_DATA,
  //       master: MASTER_DATA
  //     })
  //   }
  //
  // }, 1000)

}