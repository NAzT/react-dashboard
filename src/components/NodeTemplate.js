import React, { Component } from 'react'
import Menu from './Menu.js'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import { menuNameMapping } from '../data/menuItems'
import styled from 'styled-components'

export default class EnvironmentType extends Component {

  constructor (props) {
    super(props)
    this.state = {temp: []}
    // debugger
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

    const mockup = () => {

      let line_data = {
        labels: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        datasets: [
          {
            label: 'Temperature',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(87, 230, 255, 1)',
            borderColor: 'rgba(87, 230, 255, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 5,
            data: [...this.state.temp]
          }
        ]
      }

      let line_options = {
        responsive: true,
        title: {
          display: false,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'C'
            }
          }]
        }
      }

      return <Line data={line_data} options={line_options}/>
    }

    const Span = styled.p`
    font-family: 'Kanit', sans-serif;
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

                  <div className='has-text-centered'>

                    <Span className='title has-text-link'>{menuNameMapping[this.props.location.pathname]}</Span>
                    <br/>
                  </div>

                  <div className="columns">
                    <div className="column">
                      {mockup()}
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