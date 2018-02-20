import { attr, fk } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class Message extends JoatuModel {}
Message.reducer = reducer
Message.modelName = 'Message'

Message.fields = {
  id: attr(),
  chat: fk('Chat', 'messages'),
  from: fk('User', 'messagesSent'),
  to: fk('User', 'messagesReceived')
}

Message.propTypes = {
  id: PropTypes.string
}
