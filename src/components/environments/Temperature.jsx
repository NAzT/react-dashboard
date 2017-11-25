import React from 'react'
import { Line } from 'react-chartjs-2'

const Temperature = (props) => {

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
        data: [...props.data]
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

export default Temperature