import React, { Component } from 'react'
import Menu from './Menu.js'
import Gauge from './Gauge.jsx'

import sensors from '../data/virtualData'

export default class Gas extends Component {

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
                <div className="card-content has-text-centered">

                  <p className='title'>Not available</p>

                  {/*<div className="columns">*/}
                    {/*{*/}
                      {/*sensors.gas.master.map(master => {*/}

                        {/*console.log(master)*/}

                        {/*return (*/}
                          {/*<div className="column is-3 has-text-centered">*/}
                            {/*<Gauge width='200' height='160' label={master.title} value={master.value} color='#ff9966'/>*/}
                          {/*</div>*/}
                        {/*)*/}
                      {/*})*/}
                    {/*}*/}
                  {/*</div>*/}

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}