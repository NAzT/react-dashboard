import axois from 'axios'

export default {
  CLOUD_FUNCTIONS: {
    MENU: (callback) => {
      setInterval(() => {
        axois.get('https://us-central1-performance-182414.cloudfunctions.net/menu').then((response) => {
          return callback(response.data)
        })
      }, 2000)
    }
  }
}