import React from 'react'
import Gauge from 'react-svg-gauge'
import uuid from 'uuid'

export default (props) => {
  return props.data.map(sensor => {
    let gaugeData = sensor.chart.data
    const average = gaugeData.reduce((total, num) => {return total + num}) / gaugeData.length
    return (
      <div className='column' key={uuid()}>
        <Gauge
          label={sensoa.name}
          value={average.toFixed(2)}
          valueLabelStyle={{
            fontSize: '20px',
            fontFamily: 'Kanit, sans-serif'
          }}
          topLabelStyle={{
            fontFamily: 'Kanit, sans-serif'
          }}
          color='#BFE6C7'
          width='180'
          height='150'
        />
      </div>
    )
  })
}