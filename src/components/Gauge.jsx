import React from 'react'
import Gauge from 'react-svg-gauge'

export default (props) => (
  <Gauge  {...props}
          valueLabelStyle={{
            fontSize: '40px',
            fontFamily: 'Kanit, sans-serif'
          }}
          topLabelStyle={{
            fontFamily: 'Kanit, sans-serif'
          }}
  />
)