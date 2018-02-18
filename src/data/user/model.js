import { fk, attr } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class User extends JoatuModel {}
User.reducer = reducer
User.modelName = 'User'

User.fields = {
  id: attr(),
  displayName: attr(),
  email: attr(),
  imgUrl: attr(),
  community: fk('Community', 'members')
}

User.propTypes = {
  id: PropTypes.string,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string,
  imgUrl: PropTypes.string.isRequired
}
