import React, { Component } from 'react'
import Menu from './Menu.js'
import Battery from './gass/Battery.jsx'
import Co from './gass/Co.jsx'
import Co2 from './gass/Co2.jsx'
import H2O from './gass/H2O.jsx'
import axios from 'axios'

export default class Gas extends Component {

  constructor (props) {
    super(props)
    this.state = {battery: [], co: [], co2: [], h2o: []}
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
                    <p className='title has-text-link'>Gas</p>
                    <br/>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <Battery data={this.state.battery}/>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <Co2 data={this.state.co2}/>
                    </div>
                    <div className="column">
                      <Co data={this.state.co}/>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <H2O data={this.state.h2o}/>
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