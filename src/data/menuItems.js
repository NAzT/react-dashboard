let generate = []
for (let i = 0; i <= 99; i++) {
  generate.push(parseInt(Math.random().toFixed(2) * 100))
}

var menuItems = [
  {
    id: 1,
    url: '/environment',
    name: 'Environment',
    icon: 'fa fa-envira',
    children: [
      {
        id: 1,
        url: '/environment/node/1',
        name: 'ห้องนอน',
        temp: generate,
        humid: generate
      },
      {
        id: 2,
        url: '/environment/node/2',
        name: 'ห้องน้ำ',
        temp: generate,
        humid: generate
      }
    ]
  },
  {
    id: 2,
    url: '/gas',
    name: 'Gas',
    icon: 'fa fa-flask',
    children: [
      {
        id: 1,
        url: '/gas/node/1',
        name: 'ห้องครัว',
        temp: generate,
        humid: generate
      },
      {
        id: 2,
        url: '/gas/node/2',
        name: 'ห้องทำงาน',
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