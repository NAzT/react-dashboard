import * as dummy from '../data/dummyCharts'

// const generator = {
//
//   environment: () => {
//     let objChild = []
//     for (let i = 0; i <= 5; i++) {
//       objChild.push({
//         id: i,
//         url: `/environment/node/${i}`,
//         name: `node ${i}`,
//         chart: {
//           label: `node ${i}`,
//           labels: ['1','2','3','4','5'],
//           data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
//         }
//       })
//     }
//     console.log(objChild)
//     return objChild
//   },
//   gas: () => {
//     let objChild = []
//     for (let i = 0; i <= 5; i++) {
//       objChild.push({
//         id: i,
//         url: `/gas/node/${i}`,
//         name: `node ${i}`,
//         chart: {
//           label: `node ${i}`,
//           labels: ['1','2','3','4','5'],
//           data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
//         }
//       })
//     }
//     return objChild
//   },
//   recycle: () => {
//     let objChild = []
//     for (let i = 0; i <= 5; i++) {
//       objChild.push({
//         id: i,
//         url: `/recycle/node/${i}`,
//         name: `node ${i}`,
//         chart: {
//           label: `node ${i}`,
//           labels: ['1','2','3','4','5'],
//           data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
//         }
//       })
//     }
//     return objChild
//   },
//   battery: () => {
//     let objChild = []
//     for (let i = 0; i <= 5; i++) {
//       objChild.push({
//         id: i,
//         url: `/battery/node/${i}`,
//         name: `node ${i}`,
//         chart: {
//           label: `node ${i}`,
//           labels: ['1','2','3','4','5'],
//           data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
//         }
//       })
//     }
//     return objChild
//   }
//
// }

const MOCKUP_API = {

  getSensorData: (cb) => {
    setTimeout(() => {

      const data = {
        'data': dummy.data.generator.data(), 'labels': dummy.data.generator.labels, 'label': dummy.data.generator.label
      }

      // const realData = {
      //
      //   environment: {
      //     url: '/environment',
      //     name: 'สภาพแวดล้อม',
      //     icon: 'fa fa-envira',
      //     children: generator.environment()
      //   },
      //   gas: {
      //     url: '/gas',
      //     name: 'แก๊ส',
      //     icon: 'fa fa-flask',
      //     children: generator.gas()
      //   },
      //   recycle: {
      //     url: '/recycle',
      //     name: 'ปริมาณขยะ',
      //     icon: 'fa fa-recycle',
      //     children: generator.recycle()
      //   },
      //   battery: {
      //     url: '/battery',
      //     name: 'แบตเตอรี่',
      //     icon: 'fa fa-battery-three-quarters',
      //     children: generator.battery()
      //   },
      //
      // }

      cb(data)
    }, 1000)
  }

}

export default MOCKUP_API
