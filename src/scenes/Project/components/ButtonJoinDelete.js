import React from 'react'
import PropTypes from 'prop-types'

import ButtonJoin from './ButtonJoin'
import ButtonUnjoin from './ButtonUnjoin'
import ButtonDelete from '../../../components/ButtonDelete'
import { isOwner, isMaybeParticipant } from '../../../data/utils'

const propTypes = {
  authenticatedUser: PropTypes.object,
  project: PropTypes.object.isRequired,
  addParticipant: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired
}

const ButtonJoinDelete = ({ authenticatedUser, project, ...props }) => {
  if (isOwner(authenticatedUser)(project)) {
    return <ButtonDelete handleClick={props.removeProject} />
  }

  if (isMaybeParticipant(authenticatedUser)(project)) {
    return (
      <ButtonUnjoin
        handleClick={props.removeParticipant}
        authenticatedUser={authenticatedUser}
      />
    )
  }

  return (
    <ButtonJoin
      handleClick={props.addParticipant}
      authenticatedUser={authenticatedUser}
    />
  )
}

ButtonJoinDelete.propTypes = propTypes

export default ButtonJoinDelete
