
var sensors = {
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
      {
        id: 1,
        url: '/gas/node/1',
        name: 'หน้าบ้าน'
      },
      {
        id: 2,
        url: '/gas/node/2',
        name: 'หลังบ้าน'
      },
      {
        id: 3,
        url: '/gas/node/3',
        name: 'ห้องครัว'
      }
    ]
  },
  {
    id: 3,
    url: '/recycle',
    name: 'ปริมาณขยะ',
    icon: 'fa fa-recycle',
    children: [
      {
        id: 1,
        url: '/recycle/node/1',
        name: 'หน้าบ้าน'
      },
      {
        id: 2,
        url: '/recycle/node/2',
        name: 'หลังบ้าน'
      },
      {
        id: 3,
        url: '/recycle/node/3',
        name: 'ห้องครัว'
      }
    ]
  },
  {
    id: 4,
    url: '/battery',
    name: 'แบตเตอรี่',
    icon: 'fa fa-battery-three-quarters',
    children: [
      {
        id: 1,
        url: '/battery/node/1',
        name: 'เซ็นเซอร์ หน้าบ้าน'
      },
      {
        id: 2,
        url: '/battery/node/2',
        name: 'เซ็นเซอร์ หลังบ้าน'
      },
      {
        id: 3,
        url: '/battery/node/3',
        name: 'เซ็นเซอร์ ห้องครัว'
      }
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