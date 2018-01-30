import React from 'react'

import ButtonJoin from './components/ButtonJoin'

const ProjectDetail = (props) => {
  console.log(props)
  const project = props.projects[props.match.params.id]

  return (
    <div>
      <h2>{project.name}</h2>
      <ButtonJoin />
    </div>
  )
}

export default ProjectDetail
