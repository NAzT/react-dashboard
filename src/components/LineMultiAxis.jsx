import React from 'react'
import { Line } from 'react-chartjs-2'

const line_options = {
  responsive: true,
    hoverMode: 'index',
    stacked: false,
    title:{
    display: true,
      text:'Chart.js Line Chart - Multi Axis'
  },
  scales: {
    yAxes: [{
      type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
      display: true,
      position: "left",
      id: "y-axis-1",
    }, {
      type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
      display: true,
      position: "right",
      id: "y-axis-2",

      // grid line settings
      gridLines: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    }],
  }
}

export default (props) => (
  <Line data={{
    labels: [...props.labels],
    datasets: [
      {
        label: 'Item 1',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(255, 179, 128, 0.5)',
        borderColor: 'rgba(255, 179, 128, 1)',
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
        data: [...props.dataItem1],
        yAxisID: "y-axis-1"
      },
      {
        label: 'Item 2',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(87, 230, 255, 0.5)',
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
        data: [...props.dataItem2],
        yAxisID: "y-axis-2"
      },
    ]
  }} options={line_options}/>
)