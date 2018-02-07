import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
import ButtonDelete from '../../components/ButtonDelete'
import Participant from './components/Participant'
import ParticipantList from './components/ParticipantList'

const ProjectInfo = props => (
  <div>
    <Typography type="display2">{props.name}</Typography>
    <Typography type="subheading">{props.place}</Typography>
    <div>
      {props.coordinates && <DisplayMap {...props} />}
      {/* FIXME Understand why start and duration are initially undefined */}
      {props.start && props.duration && <ProjectDetails {...props} />}
    </div>
    <div>
      <ButtonJoin
        handleClick={props.onJoin}
        authenticated={props.authenticated.authenticated}
      />
      <ButtonDelete
        handleClick={props.onDelete}
        authenticated={props.authenticated.authenticated}
      />
    </div>
    <ParticipantList>
      {props.participants &&
        Object.keys(props.participants).map(id => (
          <Participant key={id} user={props.participants[id]} />
        ))}
    </ParticipantList>
  </div>
)

ProjectInfo.propTypes = {
  authenticated: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.string,
  participants: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired
}

export default ProjectInfo
