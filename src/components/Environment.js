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

  componentWillMount () {

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
                      <Line label='Line2' data={data.generate.data()}
                            labels={data.generate.labels}
                            backgroundColor='rgba(87, 230, 255, 0.5)'
                            borderColor='rgba(87, 230, 255, 0.5)'
                            pointBorderColor='rgba(255, 163, 102, 1)'
                      />
                    </div>
                    <div className="column">
                      <Line label='Line3' data={data.generate.data()}
                            labels={data.generate.labels}
                            backgroundColor='rgba(68, 104, 176, 0.5)'
                            borderColor='rgba(68, 104, 176, 0.5)'
                            pointBorderColor='rgba(255, 163, 102, 1)'
                            lineTension='0'
                      />
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <Line label='Line4' data={data.generate.data()}
                            labels={data.generate.labels}
                            backgroundColor='rgba(254, 178, 194, 0.5)'
                            borderColor='rgba(254, 178, 194, 0.5)'
                            pointBorderColor='rgba(255, 163, 102, 1)'
                            lineTension='0'
                      />
                    </div>
                    <div className="column">
                      <Line label='Line5' data={data.generate.data()}
                            labels={data.generate.labels}
                            backgroundColor='rgba(223, 191, 159, 0.5)'
                            borderColor='rgba(223, 191, 159, 0.5)'
                            pointBorderColor='rgba(255, 163, 102, 1)'
                            lineTension='0.3'
                      />
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