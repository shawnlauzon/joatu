import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'

import ProfileView from './components/ProfileView'
import ViewComments from './components/ViewComments'
import AddComment from './components/AddComment'
import ButtonStartChat from './components/ButtonStartChat'
import DonateCaps from '../../components/DonateCaps'

import { authenticatedUser, userWithId } from '../../data/user/selectors'

import { create } from '../../data/comment/actions'
import { sendCaps } from '../../data/user/actions'
import { chatWithUser } from '../../data/chat/selectors'
// import { chatWithUser } from '../../data/chatByUser/selectors'

class Profile extends React.Component {
  profileUserId = () => this.props.match.params.profileId

  isProfileOfCurrentUser = () =>
    this.props.authenticatedUser.id === this.profileUserId()

  handleNewComment = text => {
    this.props.createComment({
      from: this.props.authenticatedUser.id,
      to: this.profileUserId(),
      text
    })
  }

  handleDonateCaps = amount => {
    this.props.sendCaps({
      from: this.props.authenticatedUser.id,
      to: this.profileUserId(),
      amount
    })
  }

  render() {
    const { user, authenticatedUser, chat } = this.props
    return (
      <div>
        {user && (
          <div>
            <div>
              <Link to="/">Return to Home</Link>
              <Avatar src={user.imgUrl} />
              {user.id !== authenticatedUser.id && (
                <div>
                  <DonateCaps
                    capsAvailable={authenticatedUser.caps}
                    onSave={this.handleDonateCaps}
                  />
                  {chat ? (
                    <ButtonStartChat
                      name={user.displayName}
                      url={`/chats/${chat.id}`}
                    />
                  ) : (
                    <ButtonStartChat
                      name={user.displayName}
                      url={`/chat-with/${this.profileUserId()}`}
                    />
                  )}
                </div>
              )}
            </div>
            <div>
              <ProfileView
                user={user}
                ownedProjects={user.projectsOwned}
                memberProjects={user.projectsParticipating}
                offers={user.offers}
                requests={user.requests}
              />
              {/* FIXME: A refresh is required to see a new comment */}
              {user.comments && (
                <div>
                  <ViewComments comments={user.comments} />
                  {!this.isProfileOfCurrentUser() && (
                    <AddComment onSave={this.handleNewComment} />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const profileUserId = ownProps.match.params.profileId

  const thisUser = authenticatedUser(state)

  return {
    authenticatedUser: thisUser,
    user: userWithId(profileUserId)(state),

    // I need to know if the authenticated user has an existing chat with the userId
    chat:
      thisUser && thisUser.id !== profileUserId
        ? chatWithUser(profileUserId)(state)
        : undefined
  }
}

const mapDispatchToProps = {
  createComment: create,
  sendCaps
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
