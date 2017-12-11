import axios from 'axios'

export default (callback) => {
  const basePath = '/data'
  const uris = ['/1.json', '/2.json', '/3.json', '/4.json']

  setInterval(() => {
    const promises = uris.map((uri) => axios.get(`${basePath}/${uri}`))
    axios.all(promises)
      .then(axios.spread((...results) => {
          results.forEach((v, idx) => {
            console.log(idx, v.data)
          })
        })
      )
  }, 10 * 1000)

}