import React from 'react'
import { Line } from 'react-chartjs-2'

const line_options = {
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

export default (props) => {

  let data = {
    lineTension: 0.5
  }

  if (props.lineTension !== undefined) {
    data.lineTension = props.lineTension
  }

  return (
    <Line data={{
      labels: [...props.labels],
      datasets: [
        {
          label: props.label,
          fill: true,
          lineTension: data.lineTension,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: props.pointBorderColor,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 5,
          data: [...props.data]
        }
      ]
    }} options={line_options}/>
  )
}