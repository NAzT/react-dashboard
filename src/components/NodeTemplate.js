import React, { Component } from 'react'
import Menu from './Menu.js'
import { Link } from 'react-router-dom'
import { menuNameMapping, menuGroupMapping } from '../data/menuItems'
import styled from 'styled-components'
import Line from './Line.jsx'
import store from '../flux/Store'

export default class EnvironmentType extends Component {

  constructor (props) {
    super(props)
    this.state = {
      sensors: {},
      node: [],
      lineDefault: {
        data: [],
        labels: []
      },
      loading: true
    }

  }

  componentWillMount () {
    store.addListener(() => {

      this.setState({sensors: store.state})

      console.log('===== node template : ', this.state.sensors)

      this.setState({
        node: this.state.sensors.nodes.filter(node => node.id === parseInt(this.props.match.params.id))[0]
      })

      this.setState({
        lineDefault: {
          data: this.state.node.chart.data || [],
          labels: this.state.node.chart.labels || []
        }
      })

      this.setState({loading: false})

    })
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
                          <span className={this.state.loading && 'fa fa-refresh fa-spin' || ''}/>
                        </li>
                      </ul>
                    </nav>
                    <br/>
                  </div>

                  <div className="columns">
                    <div className="column">

                      <Line label='ปริมาณ'
                            data={this.state.lineDefault.data}
                            labels={this.state.lineDefault.labels}
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