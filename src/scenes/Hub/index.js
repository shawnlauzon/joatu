import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Typography from 'material-ui/Typography'

import TabbedList from './components/TabbedList'
import ResponsivePage from './components/ResponsivePage'

import CreateProject from './scenes/CreateProject'
import CreateOffer from './scenes/CreateOffer'
import CreateRequest from './scenes/CreateRequest'
import Project from '../Project'
import OfferContainer from '../OfferContainer'
import RequestContainer from '../RequestContainer'

import ProjectList from './components/ProjectList'
import OfferList from './components/OfferList'
import RequestList from './components/RequestList'

import { authenticatedUser } from '../../data/user/selectors'
import { hubWithId } from '../../data/hub/selectors'
import { projectsInHub } from '../../data/project/selectors'
import { requestsInHub } from '../../data/request/selectors'
import { offersInHub } from '../../data/offer/selectors'

import {
  projectActions,
  offerActions,
  requestActions
} from '../../data/actions'

export class Hub extends React.Component {
  addBaseParameters = body =>
    Object.assign({}, body, {
      hub: this.props.hub.id,
      owner: this.props.authenticatedUser.id
    })

  createProjectPane = routeInfo => {
    return (
      <CreateProject
        {...routeInfo}
        hub={this.props.hub}
        authenticatedUser={this.props.authenticatedUser}
        onCreate={body =>
          this.props.createProject(this.addBaseParameters(body))
        }
        cancelUrl={this.props.match.url + '/projects'}
      />
    )
  }

  createOfferPane = routeInfo => {
    return (
      <CreateOffer
        {...routeInfo}
        onCreate={body => this.props.createOffer(this.addBaseParameters(body))}
        cancelUrl={this.props.match.url + '/offers'}
      />
    )
  }

  createRequestPane = routeInfo => {
    return (
      <CreateRequest
        {...routeInfo}
        onCreate={body =>
          this.props.createRequest(this.addBaseParameters(body))
        }
        cancelUrl={this.props.match.url + '/requests'}
      />
    )
  }

  render() {
    return (
      <div>
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
                component={Project}
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

function mapStateToProps(state, ownProps) {
  const hubId = ownProps.match.params.hubId

  return {
    authenticatedUser: authenticatedUser(state),
    hub: hubWithId(hubId)(state),
    projects: projectsInHub(hubId)(state),
    offers: offersInHub(hubId)(state),
    requests: requestsInHub(hubId)(state)
  }
}

const mapDispatchToProps = {
  createProject: projectActions.create,
  createOffer: offerActions.create,
  createRequest: requestActions.create
}

// TODO Using withRouter is not the most efficient solution
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hub))
