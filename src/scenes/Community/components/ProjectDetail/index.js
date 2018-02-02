import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
import ButtonDelete from './components/ButtonDelete'
// import ParticipantList from './components/ParticipantList'

const ProjectDetail = props => {
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
        {props.coordinates && <DisplayMap location={props.coordinates} />}
        {/* TODO the hourly award needs to be calculated */}
        <ProjectDetails
          start={props.start}
          duration={props.duration}
          hourlyAward={15}
        />
      </div>
      <div>
        <ButtonJoin handleClick={handleJoin} />
        <ButtonDelete handleClick={handleDelete} />
      </div>
      {/* FIXME: Need to understand how to resolve references */}
      {/* <ParticipantList
        participants={props.project.participants}
        users={props.users}
      /> */}
    </div>
  )
}

ProjectDetail.propTypes = {
  id: PropTypes.string.isRequired,
  start: PropTypes.any.isRequired,
  duration: PropTypes.number.isRequired,
  coordinates: PropTypes.object.isRequired,
  onDeleteProject: PropTypes.func.isRequired
}

export default ProjectDetail
