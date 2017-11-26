import React, { Component } from 'react'
import Menu from './Menu.js'
import Gauge from './Gauge.jsx'

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
                    <div className="column has-text-centered">
                      <Gauge width='200' height='160' label='เซ็นเซอร์ หน้าบ้าน' value='60' color='#ff9966'/>
                    </div>
                    <div className="column has-text-centered">
                      <Gauge width='200' height='160' label='เซ็นเซอร์ หลังบ้าน' value='20' color='#ff4d4d'/>
                    </div>
                    <div className="column has-text-centered">
                      <Gauge width='200' height='160' label='เซ็นเซอร์ ห้องครัว' value='90' color='#00cc00'/>
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