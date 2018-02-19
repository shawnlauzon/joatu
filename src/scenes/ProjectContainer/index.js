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

import { authenticatedUser } from '../../data/user/selectors'

import { projectWithId } from '../../data/project/selectors'

class ProjectContainer extends React.Component {
  projectId = () => this.props.match.params.projectId

  render() {
    const {
      authenticatedUser,
      project,
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
            handleClick={() =>
              addParticipant(authenticatedUser.id, this.projectId())
            }
            authenticatedUser={authenticatedUser}
          />
          <ButtonDelete
            handleClick={() => removeProject(this.projectId())}
            authenticatedUser={authenticatedUser}
          />
        </div>
        <ParticipantList>
          {project.participants.map(participant => (
            <UserChip key={participant.id} user={participant} />
          ))}
        </ParticipantList>
      </div>
    )
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
