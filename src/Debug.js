const functions = require('firebase-functions')
const moment = require('moment-timezone')
const cors = require('cors')({origin: true})

const sensors = {
  master: [
    {
      environment: [
        {
          id: 1,
          title: 'temperature',
          value: 30
        },
        {
          id: 2,
          title: 'humidity',
          value: 60
        },
        {
          id: 3,
          title: 'sound',
          value: 45
        },
        {
          id: 4,
          title: 'pressure',
          value: 1000
        }
      ],
      trash: [
        {
          id: 1,
          title: 'trashed',
          value: 30
        }
      ],
      battery: [
        {
          id: 1,
          title: 'battery',
          value: 30
        }
      ]
    }
  ],
  nodes: [
    {
      id: 1, name: 'หน้าชมรมด้านนอก',
      chart: {
        label: `node 1`,
        labels: ['1', '2', '3', '4', '5'],
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
      }
    },
    {
      id: 2, name: 'ห้องชมรมชั้น 2',
      chart: {
        label: `node 2`,
        labels: ['1', '2', '3', '4', '5'],
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
      }
    },
    {
      id: 3, name: 'ห้องชมรมชั้น 3',
      chart: {
        label: `node 3`,
        labels: ['1', '2', '3', '4', '5'],
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
      }
    },
    {
      id: 4, name: 'โกดัง',
      chart: {
        label: `node 4`,
        labels: ['1', '2', '3', '4', '5'],
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
      }
    }
  ]
}

exports.menu = functions.https.onRequest((req, res) => {
  let menu = [{
    'id': 1,
    'url': '/environment',
    'name': 'สภาพแวดล้อม',
    'icon': 'fa fa-envira',
    'children': [
      ...sensors.nodes.map((item) => {
        return {
          id: item.id,
          name: item.name,
          url: `/environment/node/${item.id}`
        }
      })]
  }, {'id': 2, 'url': '/gas', 'name': 'แก๊ส', 'icon': 'fa fa-flask', 'children': []}, {
    'id': 3,
    'url': '/trash',
    'name': 'ปริมาณขยะ',
    'icon': 'fa fa-recycle',
    'children': []
  }, {'id': 4, 'url': '/battery', 'name': 'แบตเตอรี่', 'icon': 'fa fa-battery-three-quarters', 'children': []}]

  cors(req, res, () => {
    res.status(200).send(JSON.stringify(menu))
  })

})

exports.sensors = functions.https.onRequest((req, res) => {

  const sensors = {
    'members': {
      'pao': {
        'environment': {
          'average': {
            'UfxJWTb3Ci': {
              'name': 'ค่าเฉลี่ยอุณหภูมิ หน้าชมรม',
              'value': 0
            },
            'H4m6bdHhh1': {
              'name': 'ค่าเฉลี่ยความชื้น ห้องชมรมชั้น 2',
              'value': 0
            },
            'ZbFLzWb9EF': {
              'name': 'ค่าเฉลี่ยเสียง ห้องชมรมชั้น 3',
              'value': 0
            },
            'hFfBDYh2cM': {
              'name': 'ค่าเฉลี่ยความกดอากาศ โกดัง',
              'value': 0
            }
          },
          'logs': {
            'wTLS33jGyF': {
              'data': {
                '30_11_2017_10_30': 30,
                '30_11_2017_10_31': 40,
                '30_11_2017_10_32': 50,
                '30_11_2017_10_33': 40,
                '30_11_2017_10_34': 30,
                '30_11_2017_10_35': 40
              },
              'id': 'UfxJWTb3Ci',
              'name': 'อุณหภูมิหน้าชมรม'
            },
            'Ta1zD8aaiE': {
              'data': {
                '30_11_2017_10_30': 40,
                '30_11_2017_10_31': 50,
                '30_11_2017_10_32': 60,
                '30_11_2017_10_33': 30,
                '30_11_2017_10_34': 40,
                '30_11_2017_10_35': 20
              },
              'id': 'H4m6bdHhh1',
              'name': 'ความชื้นห้องชมรมชั้น 2'
            },
            'PwReqDDnNh': {
              'data': {
                '30_11_2017_10_30': 50,
                '30_11_2017_10_31': 60,
                '30_11_2017_10_32': 70,
                '30_11_2017_10_33': 50,
                '30_11_2017_10_34': 40,
                '30_11_2017_10_35': 20
              },
              'id': 'ZbFLzWb9EF',
              'name': 'ปริมาณเสียงห้องชมรมชั้น 3'
            },
            'cOoEE8JyMy': {
              'data': {
                '30_11_2017_10_30': 10,
                '30_11_2017_10_31': 20,
                '30_11_2017_10_32': 30,
                '30_11_2017_10_33': 20,
                '30_11_2017_10_34': 50,
                '30_11_2017_10_35': 30
              },
              'id': 'hFfBDYh2cM',
              'name': 'ความกดอากาศโกดัง'
            }
          },
          'type': 1
        },
        'trashed': {
          'average': {
            'uooI9XD2vV': {
              'name': 'ค่าเฉลี่ย ปริมาณขยะชั้น 2',
              'value': 0
            }
          },
          'logs': {
            'v60v7QytYF': {
              'data': {
                '30_11_2017_10_30': 100,
                '30_11_2017_10_31': 70,
                '30_11_2017_10_32': 30,
                '30_11_2017_10_33': 80,
                '30_11_2017_10_34': 10,
                '30_11_2017_10_35': 80
              },
              'id': 'uooI9XD2vV',
              'name': 'ห้องชมรมชั้น 2'
            }
          },
          'type': 2
        },
        'battery': {
          'average': {
            'dKausSlPGN': {
              'name': 'ค่าเฉลี่ยใช้พลังงาน เซ็นเซอร์หน้าชมรม',
              'value': 0
            },
            'zOu43BAYCm': {
              'name': 'ค่าเฉลี่ยใช้พลังงาน เซ็นเซอร์ชั้น 2',
              'value': 0
            },
            '2thSxUtOGy': {
              'name': 'ค่าเฉลี่ยใช้พลังงาน เซ็นเซอร์ชั้น 3',
              'value': 0
            },
            'opa9pT7sL6': {
              'name': 'ค่าเฉลี่ยใช้พลังงาน เซ็นเซอร์โกดัง',
              'value': 0
            }
          },
          'logs': {
            'ypwN1xCzfy': {
              'data': {
                '30_11_2017_10_30': 100,
                '30_11_2017_10_31': 90,
                '30_11_2017_10_32': 80,
                '30_11_2017_10_33': 70,
                '30_11_2017_10_34': 60,
                '30_11_2017_10_35': 50
              },
              'id': 'dKausSlPGN',
              'name': 'เซ็นเซอร์หน้าชมรม'
            },
            'E0lzSWOtcx': {
              'data': {
                '30_11_2017_10_30': 50,
                '30_11_2017_10_31': 60,
                '30_11_2017_10_32': 70,
                '30_11_2017_10_33': 80,
                '30_11_2017_10_34': 90,
                '30_11_2017_10_35': 100
              },
              'id': 'zOu43BAYCm',
              'name': 'เซ็นเซอร์ชั้น 2'
            },
            'h7p66FhwJU': {
              'data': {
                '30_11_2017_10_30': 10,
                '30_11_2017_10_31': 20,
                '30_11_2017_10_32': 30,
                '30_11_2017_10_33': 40,
                '30_11_2017_10_34': 50,
                '30_11_2017_10_35': 40
              },
              'id': '2thSxUtOGy',
              'name': 'เซ็นเซอร์ชั้น 3'
            },
            'pijhVzIS9B': {
              'data': {
                '30_11_2017_10_30': 70,
                '30_11_2017_10_31': 60,
                '30_11_2017_10_32': 80,
                '30_11_2017_10_33': 30,
                '30_11_2017_10_34': 100,
                '30_11_2017_10_35': 40
              },
              'id': 'opa9pT7sL6',
              'name': 'เซ็นเซอร์โกดัง'
            }
          },
          'type': 3
        }
      }
    }
  }

  cors(req, res, () => {
    const formattedDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')
    const responseJson = {created_at: formattedDate, body: sensors}
    res.status(200).send(responseJson)
  })

})