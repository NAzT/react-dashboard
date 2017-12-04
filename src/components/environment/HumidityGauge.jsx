import React from 'react'
import Gauge from 'react-svg-gauge'
import uuid from 'uuid'

export default (props) => {

  const data = []

  for (let key in props.data) {
    if (props.data.hasOwnProperty(key)) {
      //console.log(props.data[key])

      const node = props.data[key]
      const humidity = node.humidity.chart.data

      data.push(
        <div className='columns' key={uuid()}>
          <div className='column'>
            <Gauge
              label={key}
              value={parseInt(humidity).toFixed(2)}
              valueLabelStyle={{
                fontSize: '16px',
                fontFamily: 'Kanit, sans-serif'
              }}
              topLabelStyle={{
                fontFamily: 'Kanit, sans-serif'
              }}
              symbol=' %rh'
              color='#feb2c2'
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