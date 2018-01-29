import React from 'react'
import PropTypes from 'prop-types'

const Project = (props) => <div>Project: {props.name}</div>

Project.propTypes = {
  name: PropTypes.string.isRequired
}

export default Project
