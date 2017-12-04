import React from 'react'
import Gauge from 'react-svg-gauge'
import uuid from 'uuid'

export default (props) => {

  const data = []

  for (let key in props.data) {
    if (props.data.hasOwnProperty(key)) {
      console.log(props.data[key])

      const node = props.data[key]
      const temperature = node.temperature.chart.data
      const humidity = node.humidity.chart.data

      data.push(
        <div className='columns'>
          <div className='column' key={uuid()}>
            <Gauge
              label={key}
              value={parseInt(temperature).toFixed(2)}
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
          <div className='column' key={uuid()}>
            <Gauge
              label={key}
              value={parseInt(humidity).toFixed(2)}
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
        </div>
      )

    }
  }

  return data

}