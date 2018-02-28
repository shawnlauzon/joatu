import React from 'react'
import PropTypes from 'prop-types'

import List from 'material-ui/List'
import ListItemOffering from './ListItemOffering'

const ProjectList = props => (
  <div>
    <List component="nav">
      {props.projects.map(project => (
        <ListItemOffering
          key={project.id}
          id={project.id}
          name={project.name}
          isApproved={project.isApproved || false}
          to={props.viewUrl + '/' + project.id}
        />
      ))}
    </List>
  </div>
)

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default ProjectList
