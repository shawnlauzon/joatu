import React from 'react'
import { connect } from 'react-redux'

import { projectWithId } from '../../data/project/selectors'

import ProjectView from './components/ProjectView'

class ProjectContainer extends React.Component {
  render() {
    const { project } = this.props

    if (!project) {
      return 'Loading ...'
    } else {
      return project && <ProjectView project={project} />
    }
  }
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.projectId

  return {
    project: projectWithId(projectId)(state)
  }
}

export default connect(mapStateToProps)(ProjectContainer)
