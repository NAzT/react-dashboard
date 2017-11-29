import React, { Component } from 'react'
import Menu from './Menu.js'
import Gauge from './Gauge.jsx'
import sensors from '../data/virtualData'

export default class Battery extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    return (

      <div className='container'>
        <div className='section'>

          <div className='columns'>
            <div className="column is-3">
              <Menu url={this.props.location.pathname}/>
            </div>
            <div className="column is-9">

              <div className="card">
                <div className="card-content">

                  <div className="columns">
                    {
                      sensors.lab.master.map((master) => {
                        let components = []
                        master.battery.forEach((obj) => {
                          components.push(
                            <div className="column is-3 has-text-centered" key={obj.id}>
                              <Gauge width='200' height='160' label={obj.title}
                                     value={obj.value} color='#ff9966'/>
                            </div>
                          )
                        })

                        return components
                      })
                    }
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