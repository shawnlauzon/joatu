import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../ButtonOffering'

const ProjectList = ({ projects }) => (
  <div>
    {Object.entries(projects).map(([id, project]) => (
      <ButtonOffering
        key={id}
        id={id}
        name={project.name}
        to={`/projects/${id}`}
      />
    ))}
  </div>
)

ProjectList.propTypes = {
  projects: PropTypes.object
}

export default ProjectList
