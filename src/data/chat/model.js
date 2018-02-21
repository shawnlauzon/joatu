import { attr, many } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class Chat extends JoatuModel {}
Chat.reducer = reducer
Chat.modelName = 'Chat'

Chat.fields = {
  id: attr(),
  //participant1: fk('User'),
  //participant2: fk('User')
  participants: many('User', 'chats')
}

Chat.propTypes = {
  id: PropTypes.string
}
