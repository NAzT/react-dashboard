import React from 'react'

const Columns = (props) => {
  //console.log(props.data)
  return (
    <div className='columns'>
      {props.data.map(graph => graph)}
    </div>
  )
}

export default Columns