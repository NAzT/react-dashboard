import React from 'react'
import Gauge from 'react-svg-gauge'
import uuid from 'uuid'

export default (props) => {

  return props.data.map(data => {

    return (
      <div className='column' key={uuid()}>
        <Gauge
          label={data.name}
          value={data.value}
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