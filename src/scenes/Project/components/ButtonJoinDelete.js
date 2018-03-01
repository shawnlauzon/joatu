import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import ButtonJoin from './ButtonJoin'
import ButtonUnjoin from './ButtonUnjoin'
import ButtonDelete from '../../../components/ButtonDelete'
import { isOwner } from '../../../data/utils'

const propTypes = {
  authenticatedUser: PropTypes.object,
  project: PropTypes.object.isRequired,
  addParticipant: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired
}

const isParticipant = (authenticatedUser, participants) =>
  R.any(R.propEq('id', authenticatedUser.id), participants)

const ButtonJoinDelete = ({ authenticatedUser, project, ...props }) => {
  return (
    <div>
      {isOwner(authenticatedUser, project) ? (
        <ButtonDelete handleClick={() => props.removeProject(project.id)} />
      ) : isParticipant(authenticatedUser, project.participants) ? (
        <ButtonUnjoin
          handleClick={() =>
            props.removeParticipant(authenticatedUser.id, project.id)
          }
          authenticatedUser={authenticatedUser}
        />
      ) : (
        <ButtonJoin
          handleClick={() =>
            props.addParticipant(authenticatedUser.id, project.id)
          }
          authenticatedUser={authenticatedUser}
        />
      )}
    </div>
  )
}

ButtonJoinDelete.propTypes = propTypes

export default ButtonJoinDelete
