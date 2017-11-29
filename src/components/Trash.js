import React, { Component } from 'react'
import Menu from './Menu.js'
import Gauge from './Gauge.jsx'
import sensors from '../data/virtualData'

export default class Recycle extends Component {

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
                      sensors.master.map((master) => {

                        // console.log(master)
                        // let components = []
                        master.trash.forEach((obj) => {
                          return (
                            <div className="column is-3 has-text-centered" key={obj.id}>
                              <Gauge width='200' height='160' label={obj.title}
                                     value={obj.value} color='#ff9966'/>
                            </div>
                          )
                        })

                        // return components
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