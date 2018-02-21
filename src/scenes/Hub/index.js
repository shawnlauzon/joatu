import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'

import Typography from 'material-ui/Typography'

import TabbedList from './components/TabbedList'
import ResponsivePage from './components/ResponsivePage'

import CreateProject from './scenes/CreateProject'
import CreateOffer from './scenes/CreateOffer'
import CreateRequest from './scenes/CreateRequest'
import ProjectContainer from '../ProjectContainer'
import OfferContainer from '../OfferContainer'
import RequestContainer from '../RequestContainer'

import ProjectList from './components/ProjectList'
import OfferList from './components/OfferList'
import RequestList from './components/RequestList'

import { authenticatedUser } from '../../data/user/selectors'
import { selectedHub } from '../../data/hub/selectors'
import { projectsInHub } from '../../data/project/selectors'
import { requestsInHub } from '../../data/request/selectors'
import { offersInHub } from '../../data/offer/selectors'
import { changeHub } from '../../data/hub/actions'

import {
  projectActions,
  offerActions,
  requestActions
} from '../../data/actions'

export class Hub extends React.Component {
  constructor(props) {
    super(props)

    if (!props.hub || props.match.params.hubId !== props.hub.id) {
      props.changeHub(props.match.params.hubId)
    }
  }

  createProjectPane = routeInfo => {
    return (
      <CreateProject
        {...routeInfo}
        authenticatedUser={this.props.authenticatedUser}
        onCreate={body => this.props.createProject(body)}
        cancelUrl={this.props.match.url + '/projects'}
      />
    )
  }

  createOfferPane = routeInfo => {
    return (
      <CreateOffer
        {...routeInfo}
        authenticatedUser={this.props.authenticatedUser}
        onCreate={body => this.props.createOffer(body)}
        cancelUrl={this.props.match.url + '/offers'}
      />
    )
  }

  createRequestPane = routeInfo => {
    return (
      <CreateRequest
        {...routeInfo}
        authenticatedUser={this.props.authenticatedUser}
        onCreate={body => this.props.createRequest(body)}
        cancelUrl={this.props.match.url + '/requests'}
      />
    )
  }

  render() {
    return (
      <div>
        <Link to="/">Back to hub map</Link>
        {this.props.hub && (
          <Typography variant="display3" gutterBottom>
            {this.props.hub.name}
          </Typography>
        )}
        <ResponsivePage
          left={
            <TabbedList {...this.props}>
              {this.props.projects && (
                <ProjectList
                  projects={this.props.projects}
                  tabName="Projects"
                  viewUrl={this.props.match.url + '/projects'}
                  createUrl={this.props.match.url + '/create-project'}
                />
              )}
              <OfferList
                offers={this.props.offers}
                tabName="Offers"
                viewUrl={this.props.match.url + '/offers'}
                createUrl={this.props.match.url + '/create-offer'}
              />
              <RequestList
                requests={this.props.requests}
                tabName="Requests"
                viewUrl={this.props.match.url + '/requests'}
                createUrl={this.props.match.url + '/create-request'}
              />
            </TabbedList>
          }
          right={
            <React.Fragment>
              <Route
                path={this.props.match.path + '/projects/:projectId'}
                component={ProjectContainer}
              />
              <Route
                path={this.props.match.path + '/offers/:offerId'}
                component={OfferContainer}
              />
              <Route
                path={this.props.match.path + '/requests/:requestId'}
                component={RequestContainer}
              />
              <Route
                path={this.props.match.path + '/create-project'}
                render={this.createProjectPane}
              />
              <Route
                path={this.props.match.path + '/create-request'}
                component={this.createRequestPane}
              />
              <Route
                path={this.props.match.path + '/create-offer'}
                component={this.createOfferPane}
              />
            </React.Fragment>
          }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticatedUser: authenticatedUser(state),
    hub: selectedHub(state),
    projects: projectsInHub(state),
    offers: offersInHub(state),
    requests: requestsInHub(state)
  }
}

const mapDispatchToProps = {
  addParticipant: projectActions.addParticipant,
  createProject: projectActions.create,
  createOffer: offerActions.create,
  createRequest: requestActions.create,
  changeHub
}

// TODO Using withRouter is not the most efficient solution
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hub))
