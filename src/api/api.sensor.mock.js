import * as dummy from '../data/dummyCharts'

const MOCKUP_API = {
  getSensorData: (cb) => {
    setTimeout(() => {
      const data = {
        'data': dummy.data.generator.data(), 'labels': dummy.data.generator.labels, 'label': dummy.data.generator.label
      }
      cb(data)
    }, 1000)
  }
}

export default MOCKUP_API
