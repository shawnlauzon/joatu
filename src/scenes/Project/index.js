import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoinDelete from './components/ButtonJoinDelete'
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

import { isOwner } from '../../data/utils'

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
        <Grid container>
          <Grid item>
            <DisplayMap
              location={
                project.location ? project.location : project.hub.location
              }
            />
            <Typography variant="subheading">{project.place}</Typography>
          </Grid>
          <Grid item>
            <ProjectDetails hourlyAward={15} project={project} />
            <div>
              <Typography variant="body1">Organized by</Typography>
              <UserChip user={project.owner} />
            </div>
            <ButtonJoinDelete
              authenticatedUser={authenticatedUser}
              project={project}
              addParticipant={addParticipant}
              removeParticipant={removeParticipant}
              removeProject={removeProject}
            />
          </Grid>
        </Grid>
        {project.benefit && (
          <div>
            <Typography variant="display1">
              How will this benefit the community?
            </Typography>
            <Typography>{project.benefit}</Typography>
          </div>
        )}
        <div>{authenticatedUser && <div />}</div>

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
