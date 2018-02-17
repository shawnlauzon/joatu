import { fk, many, attr, Model } from 'redux-orm'
import PropTypes from 'prop-types'

// TODO Figure out why 'prop-types/PropTypes' doesn't like this
// import propTypesMixin from 'redux-orm-proptypes'
// const ValidatingModel = propTypesMixin(Model)

class JoatuModel extends Model {}
// class JoatuModel extends ValidatingModel {}

export class User extends JoatuModel {}
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

// Project is associated with a community
export class Project extends JoatuModel {}
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

//  Requests and Offers are associated with an owner (who is a member of a community)
export class Offer extends JoatuModel {}
Offer.modelName = 'Offer'
Offer.fields = {
  id: attr(),
  name: attr(),
  owner: fk('User', 'offers')
}
Offer.propTypes = {
  id: PropTypes.string
}

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
