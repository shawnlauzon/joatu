import React from 'react'
import { connect } from 'react-redux'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
import ButtonDelete from '../../components/ButtonDelete'
import ParticipantList from './components/ParticipantList'
import UserChip from '../../components/UserChip'

import { projectActions } from '../../data/actions'

import { getParticipantsInProject } from '../../data/projects'

class ProjectContainer extends React.Component {
  projectId = () => this.props.match.params.projectId

  render() {
    const {
      authUser,
      project,
      participants,
      addParticipant,
      removeProject
    } = this.props
    if (!project) {
      return null
    }

    return (
      <div>
        <Typography variant="display2">{project.name}</Typography>
        <Typography variant="subheading">{project.place}</Typography>
        <div>
          {project.coordinates && (
            <DisplayMap coordinates={project.coordinates} />
          )}
          <ProjectDetails hourlyAward={15} project={project} />
        </div>
        <div>
          <ButtonJoin
            handleClick={() => addParticipant(authUser.id, this.projectId())}
            authenticated={authUser.authenticated}
          />
          <ButtonDelete
            handleClick={() => removeProject(this.projectId())}
            authenticated={authUser.authenticated}
          />
        </div>
        <ParticipantList>
          {participants &&
            Object.keys(participants).map(id => (
              <UserChip key={id} user={participants[id]} />
            ))}
        </ParticipantList>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.projectId

  const project = state.projects[projectId]
  const owner = project ? state.users[project.owner] : {}
  const participants = getParticipantsInProject(projectId)(state)

  return {
    authUser: state.authUser,
    owner,
    project,
    participants
  }
}

const mapDispatchToProps = {
  addParticipant: projectActions.addParticipant,
  removeProject: projectActions.remove
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)
