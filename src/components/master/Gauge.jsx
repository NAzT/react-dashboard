import React from 'react'
import Gauge from 'react-svg-gauge'
import uuid from 'uuid'

export default (props) => {

    return (
      <div className='column' key={uuid()}>
        <Gauge
          label={props.label}
          value={props.value}
          valueLabelStyle={{
            fontSize: '16px',
            fontFamily: 'Kanit, sans-serif'
          }}
          topLabelStyle={{
            fontFamily: 'Kanit, sans-serif'
          }}
          color='#CCEAE1'
          width='180'
          height='150'
          symbol={props.symbol}
        />
      </div>
    )

}