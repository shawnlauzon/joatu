import React from 'react'
import { connect } from 'react-redux'

import ProfileView from './components/ProfileView'

import {
  getOwnedProjectsForUser,
  getMemberProjectsForUser,
  getOffersForUser,
  getRequestsForUser
} from '../../data/users'

class Profile extends React.Component {
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
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const userId = ownProps.match.params.profileId

  return {
    user: state.users[userId],
    ownedProjects: getOwnedProjectsForUser(userId)(state),
    memberProjects: getMemberProjectsForUser(userId)(state),
    offers: getOffersForUser(userId)(state),
    requests: getRequestsForUser(userId)(state)
  }
}

export default connect(mapStateToProps)(Profile)
