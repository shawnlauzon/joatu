import { attr, many } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

// A Chat has exactly two participants, because then given two users,
// we can find the specific Chat. Only participants can view the Chat.
//
// For multiple participants, use a Discussion
export default class Chat extends JoatuModel {}
Chat.reducer = reducer
Chat.modelName = 'Chat'

Chat.fields = {
  id: attr(),
  participants: many('User', 'chats')
}

Chat.propTypes = {
  id: PropTypes.string
}
