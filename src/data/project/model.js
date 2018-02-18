import { fk, many, attr } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'
import User from '../user/model'

import reducer from './reducer'

// Project is associated with a community
export default class Project extends JoatuModel {}
Project.reducer = reducer
Project.modelName = 'Project'

Project.fields = {
  id: attr(),
  owner: fk('User', 'projects'),
  community: fk('Community', 'projects'),
  participants: many('User', 'projectsParticipating')
}

Project.propTypes = {
  id: PropTypes.string,
  owner: PropTypes.oneOf([PropTypes.instanceOf(User), PropTypes.string])
    .isRequired
}
