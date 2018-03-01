import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
import ButtonUnjoin from './components/ButtonUnjoin'
import ButtonDelete from '../../components/ButtonDelete'
import ParticipantList from './components/ParticipantList'
import UserChip from '../../components/UserChip'
import Conversation from '../../components/Conversation'

import { authenticatedUser } from '../../data/user/selectors'
import { commentsTo } from '../../data/comment/selectors'
import { create as createComment } from '../../data/comment/actions'
import { projectWithId } from '../../data/project/selectors'
import {
  addParticipant,
  removeParticipant,
  remove as removeProject
} from '../../data/project/actions'

const isOwner = (authenticatedUser, project) =>
  authenticatedUser !== undefined && authenticatedUser.id === project.owner.id

const isParticipant = (authenticatedUser, participants) =>
  R.any(R.propEq('id', authenticatedUser.id), participants)

class Project extends React.Component {
  handleNewMessage = text =>
    this.props.createComment({
      from: this.props.authenticatedUser.id,
      to: this.props.project.id,
      text
    })

  canVolunteer = () =>
    this.props.authenticatedUser &&
    this.props.authenticatedUser.homeHub === this.props.project.hub.id

  render() {
    const {
      authenticatedUser,
      project,
      comments,
      addParticipant,
      removeParticipant,
      removeProject
    } = this.props

    return !project ? null : (
      <div>
        <Typography variant="display2">{project.name}</Typography>
        <Typography variant="headline">At {project.place}</Typography>
        <div>
          {project.location ? (
            <DisplayMap location={project.location} />
          ) : (
            <DisplayMap location={project.hub.location} />
          )}
          <ProjectDetails hourlyAward={15} project={project} />
        </div>
        <div>
          {authenticatedUser && (
            <div>
              {isOwner(authenticatedUser, project) ? (
                <ButtonDelete handleClick={() => removeProject(project.id)} />
              ) : isParticipant(authenticatedUser, project.participants) ? (
                <ButtonUnjoin
                  handleClick={() =>
                    removeParticipant(authenticatedUser.id, project.id)
                  }
                  authenticatedUser={authenticatedUser}
                />
              ) : (
                <ButtonJoin
                  handleClick={() =>
                    addParticipant(authenticatedUser.id, project.id)
                  }
                  authenticatedUser={authenticatedUser}
                />
              )}
            </div>
          )}
        </div>
        <div>
          <Typography variant="body1">Organized by</Typography>
          <UserChip user={project.owner} />
        </div>

        <ParticipantList isOwner={isOwner(authenticatedUser, project)}>
          {project.participants.map(participant => (
            <UserChip key={participant.id} user={participant} />
          ))}
        </ParticipantList>
        {(this.canVolunteer() || comments.length > 0) && (
          <div>
            <Typography variant="display1">Talk about the project</Typography>
            <Conversation
              messages={comments}
              disableNewMessages={!this.canVolunteer()}
              onNewMessage={this.handleNewMessage}
            />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.projectId
  return {
    authenticatedUser: authenticatedUser(state),
    project: projectWithId(projectId)(state),
    // TODO Perhaps move comments as part of project
    comments: commentsTo(projectId)(state)
  }
}

const mapDispatchToProps = {
  addParticipant,
  removeParticipant,
  removeProject,
  createComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
