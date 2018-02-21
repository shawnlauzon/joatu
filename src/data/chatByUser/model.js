import { attr, fk, many } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class ChatByUser extends JoatuModel {}
ChatByUser.reducer = reducer
ChatByUser.modelName = 'ChatByUser'

// A ChatByUser is created for each participant
ChatByUser.fields = {
  id: attr(), // A user ID
  participant: fk('User'), // The other user ID
  chat: fk('Chat')
}

ChatByUser.propTypes = {
  id: PropTypes.string
}
