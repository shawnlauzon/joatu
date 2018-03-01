import { fk, many, attr } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'
import User from '../user/model'

import reducer from './reducer'

// Project is associated with a hub
export default class Project extends JoatuModel {}
Project.reducer = reducer
Project.modelName = 'Project'

Project.fields = {
  id: attr(),
  owner: fk('User', 'projectsOwned'),
  hub: fk('Hub', 'projects'),
  participants: many('User', 'projectsParticipating'),
  comments: fk('Comment', 'project')
}

Project.propTypes = {
  id: PropTypes.string,
  owner: PropTypes.oneOf([PropTypes.instanceOf(User), PropTypes.string])
    .isRequired
}
