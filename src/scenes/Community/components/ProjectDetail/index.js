import React from 'react'

import ButtonJoin from './components/ButtonJoin'
import ParticipantList from './components/ParticipantList'

const ProjectDetail = (props) => {
  console.log(props)
  const project = props.projects[props.match.params.id]

  return (
    <div>
      <h2>{project.name}</h2>
      <ButtonJoin />
      <ParticipantList participants={project.participants} users={props.users} />
    </div>
  )
}

export default ProjectDetail
