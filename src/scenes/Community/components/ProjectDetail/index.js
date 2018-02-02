import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
// import ParticipantList from './components/ParticipantList'

const ProjectDetail = props => {
  return (
    <div>
      <Typography type="display2">{props.project.name}</Typography>
      <Typography type="subheading">{props.project.location}</Typography>
      <div>
        {props.project.coordinates && (
          <DisplayMap location={props.project.coordinates} />
        )}
        {/* TODO the hourly award needs to be calculated */}
        <ProjectDetails
          start={props.project.start}
          duration={props.project.duration}
          hourlyAward={15}
        />
      </div>
      <ButtonJoin />
      {/* FIXME: Need to understand how to resolve references */}
      {/* <ParticipantList
        participants={props.project.participants}
        users={props.users}
      /> */}
    </div>
  )
}

ProjectDetail.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectDetail
