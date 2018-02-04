import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
import ButtonDelete from './components/ButtonDelete'
import ParticipantList from './components/ParticipantList'

const ProjectInfo = props => {
  const handleJoin = e => {
    console.log('JOIN US!')
  }

  const handleDelete = e => {
    props.onDeleteProject(props.id)
  }

  return (
    <div>
      <Typography type="display2">{props.name}</Typography>
      <Typography type="subheading">{props.location}</Typography>
      <div>
        {props.coordinates && <DisplayMap {...props} />}
        {/* TODO the hourly award needs to be calculated */}
        {/* FIXME Understand why start and duration are initially undefined */}
        {props.start &&
          props.duration && <ProjectDetails {...props} hourlyAward={15} />}
      </div>
      <div>
        <ButtonJoin handleClick={handleJoin} />
        <ButtonDelete handleClick={handleDelete} />
      </div>
      <ParticipantList {...props} />
    </div>
  )
}

ProjectInfo.propTypes = {
  id: PropTypes.string.isRequired,
  onDeleteProject: PropTypes.func.isRequired
}

export default ProjectInfo
