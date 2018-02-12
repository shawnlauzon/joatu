import React from 'react'
import { connect } from 'react-redux'

import ProfileView from './components/ProfileView'

import {
  getProjectsForUser,
  getOffersForUser,
  getRequestsForUser
} from '../../data/users'

class Profile extends React.Component {
  render() {
    return (
      <div>
        <ProfileView
          user={this.props.user}
          projects={this.props.projects}
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
    projects: getProjectsForUser(userId)(state),
    offers: getOffersForUser(userId)(state),
    requests: getRequestsForUser(userId)(state)
  }
}

export default connect(mapStateToProps)(Profile)
