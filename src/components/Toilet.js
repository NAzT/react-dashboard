import React, { Component } from 'react'
import Menu from './Menu.js'
import Temperature from './toilets/Temperature.jsx'
import Humidity from './toilets/Humidity.jsx'
import Ammonia from './toilets/Ammonia.jsx'
import axios from 'axios'

export default class Location extends Component {

  constructor (props) {
    super(props)
    this.state = {temp: [], humid: [], ammonia: []}
  }

  componentDidMount () {
    setInterval(() => {
      let then = this
      axios.get('https://us-central1-performance-182414.cloudfunctions.net/generate_objects')
        .then(function (response) {
          let data = response.data.body
          then.setState({
            temp: data,
            humid: data,
            sound: data
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }, 2000)
  }

  render () {
    return (
      <div className='container'>
        <div className='section'>

          <div className='columns'>
            <div className="column is-2">
              <Menu url={this.props.location.pathname}/>
            </div>
            <div className="column is-10">
              <div className="card">
                <div className="card-content">

                  <div className='has-text-centered'>
                    <p className='title has-text-link'>Toiler</p>
                    <br/>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <Temperature data={this.state.temp}/>
                    </div>
                    <div className="column">
                      <Humidity data={this.state.humid}/>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <Ammonia data={this.state.ammonia}/>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}