import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'

import ProfileView from './components/ProfileView'
import ViewComments from './components/ViewComments'
import AddComment from './components/AddComment'
import ButtonStartChat from './components/ButtonStartChat'

import { authenticatedUser, userWithId } from '../../data/user/selectors'

import { create } from '../../data/comment/actions'

class Profile extends React.Component {
  profileUserId = () => this.props.match.params.profileId

  isProfileOfCurrentUser = () =>
    this.props.authenticatedUser.id === this.profileUserId()

  handleNewComment = text => {
    this.props.createComment({
      from: this.props.authUser.id,
      to: this.profileUserId(),
      text
    })
  }

  render() {
    console.log('profile', this.props)
    return (
      <div>
        {this.props.user && (
          <div>
            <div>
              <Avatar src={this.props.user.imgUrl} />
              {this.props.chatId ? (
                <ButtonStartChat
                  name={this.props.user.displayName}
                  url={`/chats/${this.props.chatId}`}
                />
              ) : (
                <ButtonStartChat
                  name={this.props.user.displayName}
                  url={`/chat-with/${this.profileUserId()}`}
                />
              )}
            </div>
            <div>
              <ProfileView
                user={this.props.user}
                ownedProjects={this.props.user.ownedProjects}
                memberProjects={this.props.user.memberProjects}
                offers={this.props.user.offers}
                requests={this.props.user.requests}
              />
              {/* FIXME: A refresh is required to see a new comment */}
              {this.props.user.comments && (
                <div>
                  <ViewComments comments={this.props.user.comments} />
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
  const userId = ownProps.match.params.profileId

  return {
    authenticatedUser: authenticatedUser(state),
    user: userWithId(userId)(state)
    // chatId: path(['users', userId, 'chats', userId], state)
  }
}

const mapDispatchToProps = {
  createComment: create
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
