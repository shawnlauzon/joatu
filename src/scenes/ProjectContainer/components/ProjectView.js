import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import DisplayMap from './DisplayMap'
import ProjectDetails from './ProjectDetails'
import ButtonJoin from './ButtonJoin'
import ButtonDelete from '../../../components/ButtonDelete'
import ParticipantList from './ParticipantList'
import UserChip from '../../../components/UserChip'

const ProjectView = ({
  authenticatedUser,
  project,
  addParticipant,
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
        <ButtonJoin
          handleClick={() => addParticipant(authenticatedUser.id, project.id)}
          authenticatedUser={authenticatedUser}
        />
        <ButtonDelete
          handleClick={() => removeProject(project.id)}
          authenticatedUser={authenticatedUser}
        />
      </div>
      <div>
        <Typography variant="body2">Organized by</Typography>
        <UserChip user={project.owner} />
      </div>

      <ParticipantList>
        {project.participants.map(participant => (
          <UserChip key={participant.id} user={participant} />
        ))}
      </ParticipantList>
    </div>
  )
}

ProjectView.propTypes = {
  authenticatedUser: PropTypes.object,
  project: PropTypes.object
}

export default ProjectView
