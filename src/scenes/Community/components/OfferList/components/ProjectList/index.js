import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../../../../../../components/ButtonOffering'

function ProjectList(props) {
  return (
    <div>
      {props.projects &&
        Object.entries(props.projects).map(entry => (
          <ButtonOffering
            key={entry[0]}
            name={entry[1].name}
            to={`/projects/${entry[0]}`}
          />
        ))}
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.object
}

export default ProjectList
