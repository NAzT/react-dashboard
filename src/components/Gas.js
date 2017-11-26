import React, { Component } from 'react'
import Menu from './Menu.js'
import { Link } from 'react-router-dom'
import { menuItems } from '../data/menuItems'
import styled from 'styled-components'

export default class Gas extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    const StyledSpan = styled.p`
      font-family: 'Kanit', sans-serif;
      color: white;
    `

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
                    {
                      menuItems.map((obj) => {

                        let buffer = []
                        if (this.props.location.pathname === obj.url) {
                          obj.children.map((child) => {
                            buffer.push(
                              <div className='column is-6' key={child.id}>
                                <div className="card"
                                     style={{
                                       backgroundColor: '#99c2ff'
                                     }}>
                                  <div className="card-content has-text-centered">
                                    <Link to={child.url}>
                                      <StyledSpan className='title'>{child.name}</StyledSpan>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }

                        return buffer

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