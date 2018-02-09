import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from './ButtonOffering'

const ProjectList = props => (
  <div>
    {Object.entries(props.projects).map(([id, project]) => (
      <ButtonOffering
        key={id}
        id={id}
        name={project.name}
        to={props.viewUrl + '/' + id}
      />
    ))}
  </div>
)

ProjectList.propTypes = {
  projects: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default ProjectList
