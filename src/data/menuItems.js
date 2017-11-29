const sensors = {
  environment: {
    master: {
      temperature: 30, humidity: 60, sound: 45, pressure: 1000
    },
    nodes: [
      {
        id: 1, name: 'Node1',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
        }
      },
      {
        id: 2, name: 'Node2',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
        }
      }
    ]
  },
  gas: {
    master: {
      co: 30, co2: 60, h2o: 10
    },
    nodes: [
      {
        id: 1, name: 'Node1',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
        }
      },
      {
        id: 2, name: 'Node2',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
        }
      },
      {
        id: 3, name: 'Node3',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
        }
      }
    ]
  },
  trash: {
    master: {
      distance: 30
    },
    nodes: [
      {
        id: 1, name: 'Node1',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
        }
      }
    ]
  },
  battery: {
    master: {
      percent: 30
    },
    nodes: [
      {
        id: 1, name: 'Node1',
        chart: {
          label: `node 1`,
          labels: ['1', '2', '3', '4', '5'],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => Math.random() * v)
        }
      }
    ]
  }
}

const menuItems = [
  {
    id: 1,
    url: '/environment',
    name: 'สภาพแวดล้อม',
    icon: 'fa fa-envira',
    children: [
      ...sensors.environment.nodes.map((item, idx) => {
        return {
          id: item.id,
          name: item.name,
          url: `/environment/node/${item.id}`
        }
      })
    ]
  },
  {
    id: 2,
    url: '/gas',
    name: 'แก๊ส',
    icon: 'fa fa-flask',
    children: [
      ...sensors.gas.nodes.map(child => {
        return {
          id: child.id,
          name: child.name,
          url: `/gas/node/${child.id}`
        }
      })
    ]
  },
  {
    id: 3,
    url: '/trash',
    name: 'ปริมาณขยะ',
    icon: 'fa fa-recycle',
    children: [
      ...sensors.trash.nodes.map(child => {
        return {
          id: child.id,
          name: child.name,
          url: `/trash/node/${child.id}`
        }
      })
    ]
  },
  {
    id: 4,
    url: '/battery',
    name: 'แบตเตอรี่',
    icon: 'fa fa-battery-three-quarters',
    children: [
      ...sensors.battery.nodes.map(child => {
        return {
          id: child.id,
          name: child.name,
          url: `/trash/node/${child.id}`
        }
      })
    ]
  }
]

const menuGroupMapping = (url) => {
  let result = {}
  menuItems.forEach(menu => {
    menu.children.forEach(subMenu => {
      if (subMenu.url === url) {
        result = {
          name: menu.name,
          url: menu.url
        }
      }
    })
  })
  return result
}

const menuNameMapping = {}
menuItems.forEach((menu, idx) => {
  menu.children.forEach(menuItem => {
    menuNameMapping[menuItem.url] = menuItem.name
  })
})

export {
  menuItems,
  menuNameMapping,
  menuGroupMapping
}