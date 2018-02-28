import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Typography } from 'material-ui'

import DisplayMap from './DisplayMap'
import ProjectDetails from './ProjectDetails'
import ButtonJoin from './ButtonJoin'
import ButtonUnjoin from './ButtonUnjoin'
import ButtonDelete from '../../../components/ButtonDelete'
import ParticipantList from './ParticipantList'
import UserChip from '../../../components/UserChip'

import { authenticatedUser } from '../../../data/user/selectors'

import {
  addParticipant,
  removeParticipant,
  remove
} from '../../../data/project/actions'

const isOwner = (authenticatedUser, project) =>
  authenticatedUser !== undefined && authenticatedUser.id === project.owner.id

const isParticipant = (authenticatedUser, participants) =>
  R.any(R.propEq('id', authenticatedUser.id), participants)

const ProjectView = ({
  authenticatedUser,
  project,
  addParticipant,
  removeParticipant,
  removeProject
}) => {
  return (
    <div>
      <Typography variant="display2">{project.name}</Typography>
      <Typography variant="subheading">{project.place}</Typography>
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
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    authenticatedUser: authenticatedUser(state)
  }
}

const mapDispatchToProps = {
  addParticipant,
  removeParticipant,
  removeProject: remove
}

ProjectView.propTypes = {
  project: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)
