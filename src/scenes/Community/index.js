import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Typography from 'material-ui/Typography'

import TabbedList from './components/TabbedList'
import ResponsivePage from './components/ResponsivePage'

import ProjectInfo from './containers/ProjectInfo'
import OfferInfo from './components/OfferInfo'
import RequestInfo from './components/RequestInfo'
import CreateProject from './scenes/CreateProject'
import CreateOffer from './scenes/CreateOffer'
import CreateRequest from './scenes/CreateRequest'

import ProjectList from './components/ProjectList'
import OfferList from './components/OfferList'
import RequestList from './components/RequestList'

export class Community extends React.Component {
  constructor(props) {
    super(props)

    this.ProjectInfoPane = routeInfo => {
      const id = routeInfo.match.params.id
      const project = this.props.projects[id]

      // TODO Find a better place for these helper functions
      const resolve = (keyMap, values) => {
        return R.pick(R.keys(keyMap), values)
      }

      if (project) {
        return (
          <ProjectInfo
            id={id}
            {...project}
            // TODO the hourly award needs to be calculated
            hourlyAward={15}
            onJoin={() => this.props.onJoinProject(id)}
            onDelete={() => this.props.onDeleteProject(id)}
            authenticated={this.props.authenticated}
            participants={resolve(project.participants, this.props.users)}
          />
        )
      } else {
        return null
      }
    }

    this.OfferInfoPane = routeInfo => {
      const id = routeInfo.match.params.id
      const offer = this.props.offers[id]

      return (
        <OfferInfo
          {...this.props}
          id={id}
          onDelete={() => this.props.onDeleteOffer(id)}
          {...offer}
        />
      )
    }

    this.RequestInfoPane = routeInfo => {
      const id = routeInfo.match.params.id
      const request = this.props.requests[id]

      return (
        <RequestInfo
          {...this.props}
          id={id}
          onDelete={() => this.props.onDeleteRequest(id)}
          {...request}
        />
      )
    }

    this.CreateProjectPane = routeInfo => {
      return (
        <CreateProject {...this.props} onCreate={this.props.onCreateProject} />
      )
    }

    this.CreateOfferPane = routeInfo => {
      return <CreateOffer {...this.props} onCreate={this.props.onCreateOffer} />
    }

    this.CreateRequestPane = routeInfo => {
      return (
        <CreateRequest {...this.props} onCreate={this.props.onCreateRequest} />
      )
    }
  }

  render() {
    return (
      <div>
        <Typography variant="display3" gutterBottom>
          {this.props.name}
        </Typography>
        <ResponsivePage
          left={
            <TabbedList {...this.props}>
              <ProjectList
                projects={this.props.projects}
                tabName="Projects"
                viewUrl="/create"
                createUrl="/create-project"
              />
              <OfferList
                offers={this.props.offers}
                tabName="Offers"
                viewUrl="/offers"
                createUrl="/create-offer"
              />
              <RequestList
                requests={this.props.requests}
                tabName="Requests"
                viewUrl="/requests"
                createUrl="/create-request"
              />
            </TabbedList>
          }
          right={
            <React.Fragment>
              <Route path="/projects/:id" component={this.ProjectInfoPane} />
              <Route path="/offers/:id" component={this.OfferInfoPane} />
              <Route path="/requests/:id" component={this.RequestInfoPane} />
              <Route
                path="/create-project"
                component={this.CreateProjectPane}
              />
              <Route
                path="/create-request"
                component={this.CreateRequestPane}
              />
              <Route path="/create-offer" component={this.CreateOfferPane} />
            </React.Fragment>
          }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    communities: state.communities,
    projects: state.projects,
    offers: state.offers,
    requests: state.requests,
    users: state.users
  }
}

Community.propTypes = {
  name: PropTypes.string.isRequired
}

// TODO Using withRouter is not the most efficient solution
export default withRouter(connect(mapStateToProps)(Community))
