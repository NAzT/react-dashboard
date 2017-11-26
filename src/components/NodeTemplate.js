import React, { Component } from 'react'
import Menu from './Menu.js'
import axios from 'axios'
import { menuNameMapping } from '../data/menuItems'
import styled from 'styled-components'
import Line from './Line.jsx'
import { data } from '../data/dummyCharts'

export default class EnvironmentType extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    const Span = styled.p`
    font-family: 'Kanit', sans-serif;
    `

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

                  <div className='has-text-centered'>

                    <Span className='title has-text-link'>{menuNameMapping[this.props.location.pathname]}</Span>
                    <br/>
                  </div>

                  <div className="columns">
                    <div className="column">

                      <Line label='ปริมาณ' data={data.generate.data()}
                            labels={data.generate.labels}
                            backgroundColor='rgba(254, 178, 194, 0.5)'
                            borderColor='rgba(254, 178, 194, 0.5)'
                            pointBorderColor='rgba(255, 163, 102, 1)'
                            lineTension='0'
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