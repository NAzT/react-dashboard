const functions = require('firebase-functions')
const moment = require('moment-timezone')
const cors = require('cors')({origin: true})

const sensors = {
  master: [
    {
      name: 'CMMC',
      data: [

        {
          type: 'temperature',
          name: 'อุณหภูมิ รอบตัวเครื่อง',
          value: 30
        },
        {
          type: 'humidity',
          name: 'ความชื้น รอบตัวเครื่อง',
          value: 60
        },
        {
          type: 'sound',
          name: 'เสียง รอบตัวเครื่อง',
          value: 45
        },
        {
          type: 'battery',
          name: 'แบตเตอรี่ ตัวเครื่อง',
          value: 30
        }

      ]

    }
  ],
  nodes: {
    environment: [
      {
        id: 1,
        url: '/environment/node/1',
        name: 'อุณหภูมิ หน้าชมรม',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
        }
      },
      {
        id: 2,
        url: '/environment/node/2',
        name: 'ความชื้น ห้องชมรมชั้น 2',
        chart: {
          label: `node 2`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
        }
      },
      {
        id: 3,
        url: '/environment/node/3',
        name: 'เสียง ห้องชมรมชั้น 3',
        chart: {
          label: `node 3`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
        }
      },
      {
        id: 4,
        url: '/environment/node/4',
        name: 'ความกดอากาศ โกดัง',
        chart: {
          label: `node 4`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
        }
      }
    ],
    battery:
      [
        {
          id: 1,
          url: '/battery/node/1',
          name: 'เครื่อง หน้าชมรม',
          chart: {
            label: `node 1`,
            labels: ['1', '2', '3', '4', '5'],
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
          }
        },
        {
          id: 2,
          url: '/battery/node/2',
          name: 'เครื่อง ห้องชมรมชั้น 2',
          chart: {
            label: `node 2`,
            labels: ['1', '2', '3', '4', '5'],
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
          }
        },
        {
          id: 3,
          url: '/battery/node/3',
          name: 'เครื่อง ห้องชมรมชั้น 3',
          chart: {
            label: `node 3`,
            labels: ['1', '2', '3', '4', '5'],
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
          }
        },
        {
          id: 4,
          url: '/battery/node/4',
          name: 'เครื่อง โกดัง',
          chart: {
            label: `node 4`,
            labels: ['1', '2', '3', '4', '5'],
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(v => Math.random().toFixed(0) * v)
          }
        }
      ]
  }
}

exports.menu = functions.https.onRequest((req, res) => {
  let menu = {
    'master': [
      ...sensors.master.map(root => {
        return {
          'url': '/',
          'name': root.name,
          'icon': 'fa fa-pie-chart',
          'data': root.data.map(item => item)
        }
      })
    ],
    'nodes': [
      {
        'id': 1,
        'url': '/environment',
        'name': 'สภาพแวดล้อม',
        'icon': 'fa fa-envira',
        'children': [
          ...sensors.nodes.environment.map((item) => {
            return {
              id: item.id,
              name: item.name,
              url: `/environment/node/${item.id}`,
              chart: item.chart
            }
          })
        ]
      },
      {
        'id': 2,
        'url': '/battery',
        'name': 'แบตเตอรี่',
        'icon': 'fa fa-battery-three-quarters',
        'children': [
          ...sensors.nodes.battery.map((item) => {
            return {
              id: item.id,
              name: item.name,
              url: `/battery/node/${item.id}`,
              chart: item.chart
            }
          })
        ]
      }
    ]
  }

  cors(req, res, () => {
    res.status(200).send(JSON.stringify(menu))
  })

})