import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'

import ProfileView from './components/ProfileView'
import Conversation from '../../components/Conversation'
import ButtonStartChat from '../../components/ButtonStartChat'
import DonateCaps from '../../components/DonateCaps'

import { authenticatedUser, userWithId } from '../../data/user/selectors'

import { create } from '../../data/comment/actions'
import { sendCaps } from '../../data/user/actions'

class Profile extends React.Component {
  profileUserId = () => this.props.match.params.profileId

  isProfileOfCurrentUser = () =>
    this.props.authenticatedUser &&
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
    const { user, authenticatedUser } = this.props
    return (
      <div>
        {user && (
          <div>
            <div>
              <Avatar src={user.imgSrc} />
              {authenticatedUser &&
                user.id !== authenticatedUser.id && (
                  <div>
                    <DonateCaps
                      capsAvailable={authenticatedUser.caps}
                      onSave={this.handleDonateCaps}
                    />
                    <ButtonStartChat userId={user.id} />
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
              {user.comments && (
                <div>
                  <Conversation
                    messages={user.comments}
                    disableNewMessages={this.isProfileOfCurrentUser()}
                    onNewMessage={this.handleNewComment}
                  />
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
    user: userWithId(profileUserId)(state)
  }
}

const mapDispatchToProps = {
  createComment: create,
  sendCaps
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
