import * as dummy from '../../public/dist/data/dummyCharts'

import sensors from '../../public/dist/data/virtualData'

const MOCKUP_API = {

  getSensorData: (cb) => {
    setInterval(() => {
      console.log('regneration...' + new Date())
      cb(sensors)
    }, 3000)
  }

}

export default MOCKUP_API
