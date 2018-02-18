import { fk, many, attr, Model } from 'redux-orm'
import PropTypes from 'prop-types'

// TODO Figure out why 'prop-types/PropTypes' doesn't like this
// import propTypesMixin from 'redux-orm-proptypes'
// const ValidatingModel = propTypesMixin(Model)

class JoatuModel extends Model {}
// class JoatuModel extends ValidatingModel {}

//  Requests and Offers are associated with an owner (who is a member of a community)
export class Chat extends JoatuModel {}
Chat.modelName = 'Chat'
Chat.fields = {
  id: attr(),
  participants: many('User', 'chats')
}
Chat.propTypes = {
  id: PropTypes.string
}

export class Message extends JoatuModel {}
Message.modelName = 'Message'
Message.fields = {
  id: attr(),
  text: attr(),
  chat: fk('Chat', 'messages')
}
Message.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
  chat: PropTypes.oneOf([PropTypes.instanceOf(Chat), PropTypes.string])
    .isRequired
}
