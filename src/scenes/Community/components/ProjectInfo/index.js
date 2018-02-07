import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
import ButtonDelete from '../ButtonDelete'
import ParticipantList from './components/ParticipantList'

const ProjectInfo = props => {
  const handleJoin = e => {
    props.onJoinProject(props.id)
  }

  return (
    <div>
      <Typography type="display2">{props.name}</Typography>
      <Typography type="subheading">{props.place}</Typography>
      <div>
        {props.coordinates && <DisplayMap {...props} />}
        {/* TODO the hourly award needs to be calculated */}
        {/* FIXME Understand why start and duration are initially undefined */}
        {props.start &&
          props.duration && <ProjectDetails {...props} hourlyAward={15} />}
      </div>
      <div>
        <ButtonJoin
          handleClick={handleJoin}
          authenticated={props.authenticated.authenticated}
        />
        <ButtonDelete
          handleClick={props.onDelete}
          authenticated={props.authenticated.authenticated}
        />
      </div>
      <ParticipantList {...props} />
    </div>
  )
}

ProjectInfo.propTypes = {
  authenticated: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onJoinProject: PropTypes.func.isRequired
}

export default ProjectInfo
