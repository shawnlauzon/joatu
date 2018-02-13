import React from 'react'
import { connect } from 'react-redux'

import ProfileView from './components/ProfileView'
import EditComment from './components/EditComment'

import {
  getOwnedProjectsForUser,
  getMemberProjectsForUser,
  getOffersForUser,
  getRequestsForUser
} from '../../data/users'

import { create } from '../../data/comments/actions'

class Profile extends React.Component {
  profileUserId = () => this.props.match.params.profileId

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
        <EditComment onSave={this.handleNewComment} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const userId = ownProps.match.params.profileId

  return {
    authUser: state.authUser,
    user: state.users[userId],
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
