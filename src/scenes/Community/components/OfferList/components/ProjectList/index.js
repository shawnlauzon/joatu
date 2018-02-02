import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../../../../../../components/ButtonOffering'

function ProjectList(props) {
  return (
    <div>
      {props.projects &&
        Object.entries(props.projects).map(([id, project]) => (
          <ButtonOffering
            key={id}
            id={id}
            name={project.name}
            to={`/projects/${id}`}
          />
        ))}
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.object
}

export default ProjectList
