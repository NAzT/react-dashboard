import axios from 'axios'

export default (callback) => {

  setInterval(() => {
    const promises = ['/1.json', '/2.json', '/3.json', '/4.json'].map((uri) => axios.get(`/data/${uri}`))
    axios.all(promises)
      .then(axios.spread((...results) => {
          results.forEach((v, idx) => {
            console.log(idx, v.data)
          })
        })
      )
  }, 10 * 1000)

}