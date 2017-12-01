import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import LineMultiAxis from './LineMultiAxis.jsx'
import Gauge from './Gauge.jsx'
import store from '../flux/stores/Menu'
import _ from 'underscore'

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
      this.setState({loading: false})
    })
  }

  componentDidUpdate() {
    if (!this.state.loading) {
      ReactDOM.render(<Gauge data={this.state.graphs}/>, document.getElementById('Gauge'))
      ReactDOM.render(<LineMultiAxis data={this.state.graphs}/>, document.getElementById('LineMultiAxis'))
    }
  }

  render () {

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
                    <div id='Gauge' className={!this.state.loading ? 'columns' : ''} style={{width: '100%'}}/>
                </div>
              </div>

              <div className={!this.state.loading ? 'card' : ''}>
                <div className={!this.state.loading ? 'card-content' : ''}>
                  <div id='LineMultiAxis'/>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )

  }
}