let generate = []
for (let i = 0; i <= 99; i++) {
  generate.push(parseInt(Math.random().toFixed(2) * 100))
}

const menuItems = [
  {
    id: 1,
    url: '/environment',
    name: 'สภาพแวดล้อม',
    icon: 'fa fa-envira',
    children: [
      {
        id: 1,
        url: '/environment/node/1',
        name: 'หน้าบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 2,
        url: '/environment/node/2',
        name: 'หลังบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 3,
        url: '/environment/node/3',
        name: 'ห้องครัว',
        temp: generate,
        humid: generate
      }
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
        name: 'หน้าบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 2,
        url: '/gas/node/2',
        name: 'หลังบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 3,
        url: '/gas/node/3',
        name: 'ห้องครัว',
        temp: generate,
        humid: generate
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
        name: 'หน้าบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 2,
        url: '/recycle/node/2',
        name: 'หลังบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 2,
        url: '/recycle/node/2',
        name: 'ห้องครัว',
        temp: generate,
        humid: generate
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
        name: 'เซ็นเซอร์ หน้าบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 2,
        url: '/battery/node/2',
        name: 'เซ็นเซอร์ หลังบ้าน',
        temp: generate,
        humid: generate
      },
      {
        id: 3,
        url: '/battery/node/3',
        name: 'เซ็นเซอร์ ห้องครัว',
        temp: generate,
        humid: generate
      }
    ]
  }
]

const menuNameMapping = {}
menuItems.forEach((menu, idx) => {
  menu.children.forEach(menuItem => {
    menuNameMapping[menuItem.url] = menuItem.name
  })
})
export {
  menuItems,
  menuNameMapping
}