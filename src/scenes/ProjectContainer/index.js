import React from 'react'
import { connect } from 'react-redux'

import { projectActions } from '../../data/actions'

import { authenticatedUser } from '../../data/user/selectors'

import { projectWithId } from '../../data/project/selectors'

import ProjectView from './components/ProjectView'

class ProjectContainer extends React.Component {
  render() {
    const {
      authenticatedUser,
      project,
      addParticipant,
      removeProject
    } = this.props

    if (!project) {
      return 'Loading ...'
    } else {
      return (
        project && (
          <ProjectView
            authenticatedUser={authenticatedUser}
            project={project}
            addParticipant={addParticipant}
            removeProject={removeProject}
          />
        )
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.projectId

  return {
    authenticatedUser: authenticatedUser(state),
    project: projectWithId(projectId)(state)
  }
}

const mapDispatchToProps = {
  addParticipant: projectActions.addParticipant,
  removeProject: projectActions.remove
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)
