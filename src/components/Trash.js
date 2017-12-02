import React, { Component } from 'react'
import Menu from './Menu.js'
import Gauge from './Gauge.jsx'
import store from '../flux/stores/Menu'
import _ from 'underscore'
import ReactDOM from 'react-dom'

export default class Trash extends Component {

  constructor (props) {
    super(props)
    this.state = {
      sensors: {},
      trash: [],
      gauges: [],
      loading: true
    }
  }

  _processStore = () => {
    const currentPath = this.props.location.pathname
    let data = _.find(store.state, (menu) => menu.url === currentPath)

    this.setState({sensors: data})

    const graphData = []

    console.log(data)

    data.children.map(v => {
      console.log(v)
    })



    this.setState({graphs: graphData})
    this.setState({loading: false})
  }

  componentWillMount () {
    store.addListener(() => {
      this._processStore()
    })
  }

  componentDidUpdate() {
    if (!this.state.loading) {
      ReactDOM.render(<Gauge data={this.state.graphs}/>, document.getElementById('Gauge'))
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
            <div className="column is-9">

              <div className={this.state.loading ? 'card' : ''}>
                <div className={this.state.loading ? 'card-content has-text-centered' : ''}>
                  <span className={this.state.loading && 'fa fa-refresh fa-spin fa-3x' || ''}/>
                </div>
              </div>

              <div className={!this.state.loading ? 'card' : ''}>
                <div className={!this.state.loading ? 'card-content' : ''}>

                  <div id='Gauge' className={!this.state.loading ? 'columns' : ''} style={{width: '100%'}}/>

                  {/*<div className="columns">*/}
                    {
                      // this.state.trash.map(trash => {
                      //
                      //   let component = []
                      //
                      //   trash.forEach(obj => {
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