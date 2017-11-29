import * as dummy from '../data/dummyCharts'

import sensors from '../data/virtualData'

const MOCKUP_API = {

  getSensorData: (cb) => {
    setInterval(() => {
      console.log('regneration...' + new Date())
      cb(sensors)
    }, 3000)
  }

}

export default MOCKUP_API
