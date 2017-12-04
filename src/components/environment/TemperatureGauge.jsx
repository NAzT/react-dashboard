import React from 'react'
import Gauge from 'react-svg-gauge'
import uuid from 'uuid'

export default (props) => {

  const data = []

  for (let key in props.data) {
    if (props.data.hasOwnProperty(key)) {
      //console.log(props.data[key])

      const node = props.data[key]
      const temperature = node.temperature.chart.data

      data.push(
        <div key={uuid()}>
          <Gauge
            label={key}
            max='50'
            value={parseInt(temperature).toFixed(2)}
            valueLabelStyle={{
              fontSize: '16px',
              fontFamily: 'Kanit, sans-serif'
            }}
            topLabelStyle={{
              fontFamily: 'Kanit, sans-serif'
            }}
            symbol=' c'
            color='#BFE6C7'
            width='180'
            height='150'
          />
        </div>
      )

    }
  }

  return data

}