// import store from '../flux/Store'
// import sensors from './virtualData'
//
// const menuItems = [
//   {
//     id: 1,
//     url: '/environment',
//     name: 'สภาพแวดล้อม',
//     icon: 'fa fa-envira',
//     children: [
//       ...sensors.nodes.map((item) => {
//         return {
//           id: item.id,
//           name: item.name,
//           url: `/environment/node/${item.id}`
//         }
//       })
//     ]
//   },
//   {
//     id: 2,
//     url: '/gas',
//     name: 'แก๊ส',
//     icon: 'fa fa-flask',
//     children: []
//   },
//   {
//     id: 3,
//     url: '/trash',
//     name: 'ปริมาณขยะ',
//     icon: 'fa fa-recycle',
//     children: []
//   },
//   {
//     id: 4,
//     url: '/battery',
//     name: 'แบตเตอรี่',
//     icon: 'fa fa-battery-three-quarters',
//     children: []
//   }
// ]

// const menuGroupMapping = (url) => {
//   let result = {}
//   menuItems.forEach(menu => {
//     menu.children.forEach(subMenu => {
//       if (subMenu.url === url) {
//         result = {
//           name: menu.name,
//           url: menu.url
//         }
//       }
//     })
//   })
//   return result
// }
//
// const menuNameMapping = {}
// menuItems.forEach((menu, idx) => {
//   menu.children.forEach(menuItem => {
//     menuNameMapping[menuItem.url] = menuItem.name
//   })
// })


// class MenuItems extends Component {
//
//   constructor (props) {
//     super(props)
//   }
//
//   componentDidMount() {
//     console.log(`====== componentDidMount`)
// export {
//   menuItems,
//   menuNameMapping,
//   menuGroupMapping
// }