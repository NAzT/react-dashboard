import React, { Component } from 'react'
import Menu from './Menu.js'
import Line from './Line.jsx'
import axios from 'axios'
import Gauge from './Gauge.jsx'
import { data } from '../data/dummyCharts'

export default class Environment extends Component {

  constructor (props) {
    super(props)
    this.state = {temp: []}
  }

  componentDidMount () {
    setInterval(() => {
      let then = this
      axios.get('https://us-central1-performance-182414.cloudfunctions.net/generate_objects')
        .then(function (response) {
          let data = response.data.body
          then.setState({
            temp: data
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }, 2000)
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
                </div>
              </div>


              <div className="card">
                <div className="card-content">

                  {/*<div className="columns">*/}
                  {/*{*/}
                  {/*menuItems.map((obj) => {*/}

                  {/*let buffer = []*/}
                  {/*if (this.props.location.pathname === obj.url) {*/}
                  {/*obj.children.map((child) => {*/}
                  {/*buffer.push(*/}
                  {/*<div className='column is-6' key={child.id}>*/}
                  {/*<div className="card">*/}
                  {/*<div className="card-content has-text-centered">*/}
                  {/*<Link to={child.url}>*/}
                  {/*<p className='title'>{child.name}</p>*/}
                  {/*</Link>*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  {/*)*/}
                  {/*})*/}
                  {/*}*/}

                  {/*return buffer*/}

                  {/*})*/}
                  {/*}*/}
                  {/*</div>*/}

                  <div className="columns">
                    <div className="column">
                      <Line label='Line1' data={data.temperature.data()} labels={data.temperature.labels}/>
                    </div>
                    <div className="column">
                      <Line label='Line2' data={data.temperature.data()} labels={data.temperature.labels}/>
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