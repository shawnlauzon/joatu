import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

import ProjectList from './components/ProjectList'
import OfferList from './components/OfferList'
import RequestList from './components/RequestList'
import ProjectInfo from '../ProjectInfo'
import OfferInfo from '../OfferInfo'
import RequestInfo from '../RequestInfo'
import CreateProject from './scenes/CreateProject'
import CreateOffer from './scenes/CreateOffer'
import CreateRequest from './scenes/CreateRequest'

const TAB_NAMES = ['Projects', 'Offers', 'Requests']

const styles = theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    left: 20,
    bottom: 20,
    right: 'auto',
    position: 'fixed'
  }
})

const CREATE_PATHS_BY_TAB = [
  '/create-project',
  '/create-offer',
  '/create-request'
]

const VIEW_PATHS_BY_TAB = ['/projects', '/offers', '/requests']

class TabbedList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tabNum: 0
    }
  }

  renderTab = () => {
    // TODO Understand why I can't use an array or object for this
    switch (this.state.tabNum) {
      case 1:
        return <OfferList offers={this.props.offers} />
      case 2:
        return <RequestList requests={this.props.requests} />
      default:
        return <ProjectList projects={this.props.projects} />
    }
  }

  onTabChanged = (event, value) => {
    this.setState({ tabNum: value })
  }

  render() {
    const { classes } = this.props
    const { tabNum } = this.state

    const ProjectInfoPane = routeInfo => {
      const id = routeInfo.match.params.id
      const project = this.props.projects[id]

      return (
        <ProjectInfo
          {...this.props}
          id={id}
          onDelete={() => this.props.onDeleteProject(id)}
          {...project}
        />
      )
    }

    const OfferInfoPane = routeInfo => {
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

    const RequestInfoPane = routeInfo => {
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

    const CreateProjectPane = routeInfo => {
      return (
        <CreateProject {...this.props} onCreate={this.props.onCreateProject} />
      )
    }

    const CreateOfferPane = routeInfo => {
      return <CreateOffer {...this.props} onCreate={this.props.onCreateOffer} />
    }

    const CreateRequestPane = routeInfo => {
      return (
        <CreateRequest {...this.props} onCreate={this.props.onCreateRequest} />
      )
    }

    return (
      <div>
        <Button
          fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          disabled={!this.props.authenticated.authenticated}
          component={Link}
          to={CREATE_PATHS_BY_TAB[this.state.tabNum]}
        >
          <AddIcon />
        </Button>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Tabs value={tabNum} onChange={this.onTabChanged}>
              {TAB_NAMES.map((name, idx) => (
                <Tab
                  component={Link}
                  to={VIEW_PATHS_BY_TAB[idx]}
                  key={idx}
                  label={name}
                />
              ))}
            </Tabs>
            {this.renderTab()}
          </Grid>
          <Grid xs={12} sm={7} item>
            <Route path="/projects/:id" render={ProjectInfoPane} />
            <Route path="/offers/:id" render={OfferInfoPane} />
            <Route path="/requests/:id" render={RequestInfoPane} />
            <Route path="/create-project" render={CreateProjectPane} />
            <Route path="/create-request" render={CreateRequestPane} />
            <Route path="/create-offer" render={CreateOfferPane} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

TabbedList.propTypes = {
  authenticated: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  projects: PropTypes.object.isRequired,
  offers: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  onCreateProject: PropTypes.func.isRequired,
  onCreateRequest: PropTypes.func.isRequired,
  onCreateOffer: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
  onDeleteOffer: PropTypes.func.isRequired
}

export default withStyles(styles)(TabbedList)
