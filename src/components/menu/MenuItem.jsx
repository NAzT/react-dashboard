import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import React, { Component } from 'react'
import uuid from 'uuid'

const styles = {
  activeMenu: {
    backgroundColor: 'hsl(217, 71%, 50%)',
    color: 'white'
  },
  activeSubMenu: {
    color: '#4468B0'
  }
}
const BoldSpan = styled.span`
      font-weight: bold;
      font-family: 'Kanit', sans-serif;
    `
export default (props) => {
  return (<NavLink activeStyle={styles.activeSubMenu} to={props.url}>
    <BoldSpan><i className='fa fa-code-fork'/> {props.name}</BoldSpan>
  </NavLink>)
}