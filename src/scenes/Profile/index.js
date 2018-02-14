import React from 'react'
import { connect } from 'react-redux'

import ProfileView from './components/ProfileView'
import ViewComments from './components/ViewComments'
import AddComment from './components/AddComment'

import {
  getOwnedProjectsForUser,
  getMemberProjectsForUser,
  getOffersForUser,
  getRequestsForUser,
  getCommentsWithCommenterForUser
} from '../../data/users'

import { create } from '../../data/comments/actions'

class Profile extends React.Component {
  profileUserId = () => this.props.match.params.profileId

  isProfileOfCurrentUser = () => this.props.authUser.id === this.profileUserId()

  handleNewComment = text => {
    this.props.create({
      from: this.props.authUser.id,
      to: this.profileUserId(),
      text
    })
  }

  render() {
    return (
      <div>
        <ProfileView
          user={this.props.user}
          ownedProjects={this.props.ownedProjects}
          memberProjects={this.props.memberProjects}
          offers={this.props.offers}
          requests={this.props.requests}
        />
        {/* FIXME: A refresh is required to see a new comment */}
        <ViewComments comments={this.props.comments} />
        {!this.isProfileOfCurrentUser() && (
          <AddComment onSave={this.handleNewComment} />
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const userId = ownProps.match.params.profileId

  return {
    authUser: state.authUser,
    user: state.users[userId],
    comments: getCommentsWithCommenterForUser(userId)(state),
    ownedProjects: getOwnedProjectsForUser(userId)(state),
    memberProjects: getMemberProjectsForUser(userId)(state),
    offers: getOffersForUser(userId)(state),
    requests: getRequestsForUser(userId)(state)
  }
}

const mapDispatchToProps = {
  create
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
