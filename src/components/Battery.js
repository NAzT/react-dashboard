import React, { Component } from 'react'
import Menu from './Menu.js'
import Gauge from './Gauge.jsx'
import store from '../flux/Store'

export default class Battery extends Component {

  constructor (props) {
    super(props)
    this.state = {
      sensors: {},
      battery: [],
      loading: true
    }
  }

  componentWillMount() {
    store.addListener(() => {
      // this.setState({
      //   sensors: store.state
      // })
      // this.setState({
      //   battery: this.state.sensors.master.map(obj => obj.battery)
      // })
      this.setState({
        loading: false
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

              <div className={this.state.loading ? 'card' : ''}>
                <div className={this.state.loading ? 'card-content has-text-centered' : ''}>
                  <span className={this.state.loading && 'fa fa-refresh fa-spin fa-3x' || ''}/>
                </div>
              </div>

              <div className={!this.state.loading ? 'card' : ''}>
                <div className={!this.state.loading ? 'card-content' : ''}>

                  <div className="columns">

                    {
                      // this.state.battery.map(battery => {
                      //
                      //   let component = []
                      //
                      //   battery.forEach(obj => {
                      //
                      //     component.push(
                      //       <div className="column is-3 has-text-centered" key={obj.id}>
                      //         <Gauge width='200' height='160' label={obj.title}
                      //                value={obj.value} color='#ff9966'/>
                      //       </div>
                      //     )
                      //
                      //   })
                      //
                      //   return component
                      //
                      // })
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