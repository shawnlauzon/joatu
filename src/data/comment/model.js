import { fk, attr } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class Comment extends JoatuModel {}
Comment.reducer = reducer
Comment.modelName = 'Comment'

Comment.fields = {
  id: attr(),
  text: attr(),
  from: fk('User', 'sentComments'),
  to: fk('User', 'comments')
}

Comment.propTypes = {
  id: PropTypes.string
}
