import react from 'react'

const lineConfig = (props) => (
  {
    labels: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    datasets: [
      {
        label: props.label,
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
        data: [1,2,3,4,5,6,7,8,9,10]
      }
    ]
  }
)

export default lineConfig
