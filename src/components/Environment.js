import React, { Component } from 'react'
import Menu from './Menu.js'
import Line from './Line.jsx'
import LineMultiAxis from './LineMultiAxis.jsx'
import Gauge from './Gauge.jsx'

import store from '../flux/Store'
import * as API from '../flux/AppDummyAction'

import sensors from '../data/virtualData'
import Columns from './Columns.jsx'
import uuid from 'uuid'

const result = []
export default class Environment extends Component {

  constructor (props) {
    super(props)
    //this.state = store.state
    this.state = {nodes: []}
  }

  componentWillMount () {
    store.addListener(() => {
      this.setState(store.state)
    })
  }

  componentDidMount () {
    API.startGetSensorData()
    let components = []

    components.push(
      sensors.lab.nodes.map(node => {
        return (
          <div className="column" key={node.id}>
            <Line label={node.chart.label} data={node.chart.data}
                  labels={node.chart.labels}
                  backgroundColor='rgba(87, 230, 255, 0.5)'
                  borderColor='rgba(87, 230, 255, 0.5)'
                  pointBorderColor='rgba(255, 163, 102, 1)'
            />
          </div>
        )
      })
    )

    components.forEach(component => {
      let buffer = []
      component.forEach(el => {
        if (el.key % 2 === 0) { // even
          buffer.push(el)
          result.push(buffer)
          buffer = []
        } else {
          buffer.push(el)
        }
      })
    })

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
                        master.environment.forEach((obj) => {
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

              <div className="card">
                <div className="card-content">

                    {
                      result.map(node => {
                        return <Columns column={node} key={uuid()}/>
                      })
                    }

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )

  }
}