import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from './ButtonOffering'

import Project from '../../../data/project/model'

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
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default ProjectList
