import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import Line from './Line.jsx'
import LineMultiAxis from './LineMultiAxis.jsx'
import Gauge from './Gauge.jsx'
import store from '../flux/stores/Menu'
import _ from 'underscore'

import Columns from './Columns.jsx'
import uuid from 'uuid'

let load = 1

export default class Environment extends Component {

  constructor (props) {
    super(props)

    this.state = {
      nodes: [],
      loading: true,
      sensors: {},
      graphs: [],
      gauges: []
    }
  }

  componentWillMount () {
    store.addListener(() => {

      const data = _.find(store.state, (menu) => menu.url === this.props.location.pathname)
      this.setState({sensors: data})
      const graphData = []
      data.children.map(graph => {
        graphData.push(graph)
      })
      this.setState({graphs: graphData})
      //console.log(this.state.graphs)

      // console.log(store.state)

      // console.log('==== environment', store.state)

      // this.setState({sensors: store.state})
      //
      // let components = []
      //
      // this.state.sensors.nodes.map(node => {
      //   //console.log(node)
      //   components.push(
      //     <div className="column" key={node.id}>
      //       <Line label={node.chart.label} data={node.chart.data}
      //             labels={node.chart.labels}
      //             backgroundColor='rgba(87, 230, 255, 0.5)'
      //             borderColor='rgba(87, 230, 255, 0.5)'
      //             pointBorderColor='rgba(255, 163, 102, 1)'
      //       />
      //     </div>
      //   )
      // })
      //
      // let buffer = []
      // components.forEach(component => {
      //   if (component.key % 2 === 0) { // even
      //     buffer.push(component)
      //     result.push(buffer)
      //     buffer = []
      //   } else {
      //     buffer.push(component)
      //   }
      // })
      //
      // this.setState({nodes: result})
      //
      // //  ================
      //
      // this.setState({
      //   gauges: this.state.sensors.master.map(master => {
      //     let components = []
      //     master.environment.forEach((obj) => {
      //       components.push(
      //         <div className="column is-3 has-text-centered" key={obj.id}>
      //           <Gauge width='200' height='160' label={obj.title}
      //                  value={obj.value} color='#ff9966'/>
      //         </div>
      //       )
      //     })
      //     return components
      //   })
      // })

      this.setState({loading: false})
    })
  }

  render () {

    if (!this.state.loading) {
      console.log(`load : ${load}`)
      load++
      ReactDOM.render(<LineMultiAxis data={this.state.graphs}/>, document.getElementById('LineMultiAxis'))
    }

    return (

      <div className='container'>
        <div className='section'>

          <div className='columns'>
            <div className="column is-3">
              <Menu url={this.props.location.pathname}/>
            </div>
            <div className="column is-9 has-text-centered">

              <div className={this.state.loading ? 'card' : ''}>
                <div className={this.state.loading ? 'card-content' : ''}>
                  <span className={this.state.loading && 'fa fa-refresh fa-spin fa-3x' || ''}/>
                </div>
              </div>

              <div className={!this.state.loading ? 'card' : ''}>
                <div className={!this.state.loading ? 'card-content' : ''}>
                  <div className={!this.state.loading ? 'columns' : ''}>
                    {
                      // this.state.gauges.map(gauge => gauge)
                    }
                  </div>
                </div>
              </div>

              <div className={!this.state.loading ? 'card' : ''}>
                <div className={!this.state.loading ? 'card-content' : ''}>
                  <div id='LineMultiAxis'/>
                  {
                    // this.state.graphs.map(node => {
                    //   return <Columns column={node} key={uuid()}/>
                    // })
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