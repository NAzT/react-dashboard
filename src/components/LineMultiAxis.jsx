import React from 'react'
import { Line } from 'react-chartjs-2'
import uuid from 'uuid'

const LineMultiAxis = (props) => {

  //console.log('==== found data line multi axis')

  let datasets = []
  let yAxes = []

  //console.log(props.data)
  const defaultOptions = {
    fill: true,
    lineTension: 0,
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
  }

  props.data.map(chart => {
    const key = uuid()
    const r = parseInt((Math.random() * 255).toFixed(0))
    const g = parseInt((Math.random() * 255).toFixed(0))
    const b = parseInt((Math.random() * 255).toFixed(0))

    datasets.push({
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.3)`,
      borderColor: `rgba(${r}, ${g}, ${b}, 0.3)`,
      label: chart.label,
      data: chart.data,
      yAxisID: key,
      ...defaultOptions
    })

    yAxes.push({
      type: 'linear',
      display: false,
      position: 'left',
      id: key
    })
  })

  props.data.map(chart => {
    const key = uuid()
    const r = parseInt((Math.random() * 255).toFixed(0))
    const g = parseInt((Math.random() * 255).toFixed(0))
    const b = parseInt((Math.random() * 255).toFixed(0))

    datasets.push({
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.3)`,
      borderColor: `rgba(${r}, ${g}, ${b}, 0.3)`,
      label: 'pm10',
      data: chart.data.map(v => v * (100 * Math.random(1, 100))),
      yAxisID: key,
      ...defaultOptions
    })

    yAxes.push({
      type: 'linear',
      display: false,
      position: 'left',
      id: key
    })
  })

  let line_data = {
    labels: ['6', '7', '8', '9', '10', '11'],
    datasets: datasets
  }
  console.log(line_data)

  let line_option = {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    title: {
      display: false,
      text: 'Chart.js Line Chart - Multi Axis'
    },
    scales: {
      yAxes: yAxes
    }
  }

  return (
    <Line data={line_data} options={line_option} key={uuid()}/>
  )

}

export default LineMultiAxis