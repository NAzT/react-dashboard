import axois from 'axios'
import paho_mqtt from 'paho-mqtt/mqttws31'

export default (callback) => {

  axois.get('https://us-central1-performance-182414.cloudfunctions.net/menu').then((response) => {
    return callback(response.data)
  })

}