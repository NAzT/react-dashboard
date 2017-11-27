import React, { Component } from 'react'
import Menu from './Menu.js'
import { Link } from 'react-router-dom'
import { menuNameMapping, menuGroupMapping } from '../data/menuItems'
import styled from 'styled-components'
import Line from './Line.jsx'
import { data } from '../data/dummyCharts'
import ApplicationStore from '../flux/MyStore'
import { APIAction } from '../flux/DataAction'

/* ===== end test ===== */

export default class EnvironmentType extends Component {

  constructor (props) {
    super(props)
    this.store = ApplicationStore
  }

  componentWillMount () {
    this.store.addListener((data) => {
      console.log(this.store.getState())
    })
  }

  componentDidMount () {
    APIAction.startGetData()
  }

  render () {

    const StyledLink = styled(Link)`
    font-family: 'Kanit', sans-serif;
    `
    const StyledA = styled.a`
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

                  <div className="level-right">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                      <ul>
                        <li>
                          <StyledLink to={menuGroupMapping(this.props.location.pathname).url}>
                            {menuGroupMapping(this.props.location.pathname).name}
                          </StyledLink>
                        </li>
                        <li className="is-active">
                          <StyledA>
                            {menuNameMapping[this.props.location.pathname]}
                          </StyledA>
                        </li>
                      </ul>
                    </nav>
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