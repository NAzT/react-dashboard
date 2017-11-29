import React from 'react'

const Columns = (props) => {
  return (
    <div className='columns'>
      {props.column.map(node => node)}
    </div>
  )
}

export default Columns