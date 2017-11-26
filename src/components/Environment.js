import React, { Component } from 'react'
import Menu from './Menu.js'
import Line from './Line.jsx'
import LineMultiAxis from './LineMultiAxis.jsx'
import Gauge from './Gauge.jsx'
import { data } from '../data/dummyCharts'

export default class Environment extends Component {

  constructor (props) {
    super(props)
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

                  <div className="columns">
                    <div className="column has-text-centered">
                      <Gauge width='200' height='160' label='Temperature' value='60' color='#ff9966'/>
                    </div>
                    <div className="column has-text-centered">
                      <Gauge width='200' height='160' label='Humidity' value='80' color='#ff4d4d'/>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column has-text-centered">
                      <Gauge width='200' height='160' label='Sound' value='40' color='#00cc00'/>
                    </div>
                    <div className="column has-text-centered">
                      <Gauge width='200' height='160' label='Pressure' value='70' color='#ff4d4d'/>
                    </div>
                  </div>

                </div>
              </div>

              <div className="card">
                <div className="card-content">

                  <div className="columns">
                    <div className="column">
                      <LineMultiAxis label='Line1'
                                     dataItem1={data.generate.data()}
                                     dataItem2={data.generate.data()}
                                     labels={data.generate.labels}/>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <Line label='Line2' data={data.generate.data()} labels={data.generate.labels}/>
                    </div>
                    <div className="column">
                      <Line label='Line3' data={data.generate.data()} labels={data.generate.labels}/>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <Line label='Line4' data={data.generate.data()} labels={data.generate.labels}/>
                    </div>
                    <div className="column">
                      <Line label='Line5' data={data.generate.data()} labels={data.generate.labels}/>
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