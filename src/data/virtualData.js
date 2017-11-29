const sensors = {
  lab: {
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
}

export default sensors