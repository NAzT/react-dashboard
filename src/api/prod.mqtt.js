import axois from 'axios'
import paho_mqtt from 'paho-mqtt/mqttws31'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

const _mapValue = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

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
    // message = JSON.parse(message.payloadString)

    Dispatcher.dispatch({
      type: TypeActions.DONE_GET_DATA,
      data: {
        'master': [{
          'url': '/',
          'name': 'CMMC',
          'icon': 'fa fa-pie-chart',
          'data': [{'type': 'temperature', 'name': 'อุณหภูมิ รอบตัวเครื่อง', 'value': 30}, {
            'type': 'humidity',
            'name': 'ความชื้น รอบตัวเครื่อง',
            'value': 60
          }, {'type': 'sound', 'name': 'เสียง รอบตัวเครื่อง', 'value': 45}, {
            'type': 'battery',
            'name': 'แบตเตอรี่ ตัวเครื่อง',
            'value': 30
          }]
        }],
        'nodes': [{
          'id': 1,
          'url': '/environment',
          'name': 'สภาพแวดล้อม',
          'icon': 'fa fa-envira',
          'children': [{
            'id': 1,
            'name': 'อุณหภูมิ หน้าชมรม',
            'url': '/environment/node/1',
            'chart': {
              'label': 'node 1',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [1, 2, 0, 4, 0, 6, 0, 8, 9, 0, 11, 12, 0]
            }
          }, {
            'id': 2,
            'name': 'ความชื้น ห้องชมรมชั้น 2',
            'url': '/environment/node/2',
            'chart': {
              'label': 'node 2',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [0, 2, 0, 4, 5, 0, 0, 8, 0, 10, 0, 0, 0]
            }
          }, {
            'id': 3,
            'name': 'เสียง ห้องชมรมชั้น 3',
            'url': '/environment/node/3',
            'chart': {
              'label': 'node 3',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [0, 2, 3, 4, 0, 0, 7, 0, 9, 0, 11, 12, 13]
            }
          }, {
            'id': 4,
            'name': 'ความกดอากาศ โกดัง',
            'url': '/environment/node/4',
            'chart': {
              'label': 'node 4',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [1, 2, 3, 0, 5, 0, 7, 8, 9, 0, 0, 12, 0]
            }
          }]
        }, {
          'id': 2,
          'url': '/battery',
          'name': 'แบตเตอรี่',
          'icon': 'fa fa-battery-three-quarters',
          'children': [{
            'id': 1,
            'name': 'เครื่อง หน้าชมรม',
            'url': '/battery/node/1',
            'chart': {
              'label': 'node 1',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [1, 0, 3, 4, 5, 6, 7, 0, 9, 0, 0, 0, 13]
            }
          }, {
            'id': 2,
            'name': 'เครื่อง ห้องชมรมชั้น 2',
            'url': '/battery/node/2',
            'chart': {
              'label': 'node 2',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [1, 2, 0, 0, 0, 0, 7, 0, 0, 10, 0, 0, 13]
            }
          }, {
            'id': 3,
            'name': 'เครื่อง ห้องชมรมชั้น 3',
            'url': '/battery/node/3',
            'chart': {
              'label': 'node 3',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [1, 2, 3, 4, 0, 6, 7, 8, 0, 10, 0, 0, 0]
            }
          }, {
            'id': 4,
            'name': 'เครื่อง โกดัง',
            'url': '/battery/node/4',
            'chart': {
              'label': 'node 4',
              'labels': ['1', '2', '3', '4', '5'],
              'data': [0, 2, 3, 0, 0, 6, 7, 8, 9, 10, 0, 12, 13]
            }
          }]
        }]
      }
    })

    // Dispatcher.dispatch({
    //   type: TypeActions.DONE_GET_DATA,
    //   data: convertData
    // })
  }

}