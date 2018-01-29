import React from 'react'
import PropTypes from 'prop-types'
import Project from './components/Project'

function ProjectList (props) {
  return (
    <div>
      {props.projects.map(project =>
        <Project key={project.id} name={project.name} />)}
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object)
}

export default ProjectList
