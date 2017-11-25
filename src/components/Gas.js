import React, { Component } from 'react'
import Menu from './Menu.js'
import { Link } from 'react-router-dom'

export default class Gas extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    const demo = [
      {
        id: 1,
        url: '/environment',
        name: 'Environment',
        icon: 'fa fa-envira',
        children: [
          {
            id: 1,
            url: '/environment/node/1',
            name: 'ห้องนอน'
          },
          {
            id: 2,
            url: '/environment/node/2',
            name: 'ห้องน้ำ'
          }
        ]
      },
      {
        id: 2,
        url: '/gas',
        name: 'Gas',
        icon: 'fa fa-flask',
        children: [
          {
            id: 1,
            url: '/gas/node/1',
            name: 'ห้องครัว'
          },
          {
            id: 2,
            url: '/gas/node/2',
            name: 'ห้องทำงาน'
          }
        ]
      }
    ]

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

                  <div className='has-text-centered'>
                    <p className='title has-text-link'>Gas</p>
                    <br/>
                  </div>

                  <div className="columns">
                    {
                      demo.map((obj) => {

                        let buffer = []
                        if (this.props.location.pathname === obj.url) {
                          obj.children.map((child) => {
                            buffer.push(
                              <div className='column is-6' key={child.id}>
                                <div className="card">
                                  <div className="card-content has-text-centered">
                                    <Link to={child.url}>
                                      <p className='title'>{child.name}</p>
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