import React from 'react'
import { Line } from 'react-chartjs-2'
import uuid from 'uuid'

const LineMultiAxis = (props) => {
  const chart = props.data

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

  console.log('props multiple lines we got.. ', props)

  chart.data.forEach((v, idx) => {
    // console.log('idx=>', idx, 'v=>', v)
    const key = uuid()
    const r = parseInt((Math.random() * 255).toFixed(0))
    const g = parseInt((Math.random() * 255).toFixed(0))
    const b = parseInt((Math.random() * 255).toFixed(0))
    datasets.push({
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.3)`,
      borderColor: `rgba(${r}, ${g}, ${b}, 0.3)`,
      label: chart.labels[idx],
      data: chart.data[idx],
      yAxisID: key,
      ...defaultOptions
    })

    if (idx === 0) {
      yAxes.push({
        type: 'linear',
        display: true,
        position: 'left',
        id: key
      })
    }
    else {
      yAxes.push({
        type: 'linear',
        display: true,
        position: 'left',
        id: key
      })
    }
  })

  let line_data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    datasets: datasets
  }

  // console.log(line_data)

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

  return (<Line data={line_data} options={line_option} key={uuid()}/>)

}

export default LineMultiAxis