import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../../../../../../components/ButtonOffering'

function ProjectList(props) {
  return (
    <div>
      {Object.values(props.projects).map(project => (
        <ButtonOffering
          key={project.id}
          name={project.name}
          to={`/projects/${project.id}`}
        />
      ))}
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.object.isRequired
}

export default ProjectList
