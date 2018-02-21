import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from './ButtonOffering'

const ProjectList = props => (
  <div>
    {props.projects.map(project => (
      <ButtonOffering
        key={project.id}
        id={project.id}
        name={project.name}
        to={props.viewUrl + '/' + project.id}
      />
    ))}
  </div>
)

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default ProjectList
