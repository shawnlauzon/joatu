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
// import CreateRequest from './scenes/CreateRequest'

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
      case 0:
        return <ProjectList projects={this.props.projects} />
      case 1:
        return <OfferList offers={this.props.offers} />
      case 2:
        return <RequestList requests={this.props.requests} />
      default:
        return <ProjectList projects={this.props.projects} />
    }
  }

  onTabChanged = (event, value) => {
    this.setState(prevState => ({ tabNum: value }))
  }

  render() {
    const { classes } = this.props
    const { tabNum } = this.state

    const ProjectInfoPane = routeInfo => {
      if (this.props.projects) {
        const project = this.props.projects[routeInfo.match.params.id]

        return (
          <ProjectInfo
            {...this.props}
            id={routeInfo.match.params.id}
            {...project}
          />
        )
      } else {
        return null
      }
    }

    const OfferInfoPane = routeInfo => {
      if (this.props.offers) {
        const offer = this.props.offer[routeInfo.match.params.id]

        return (
          <OfferInfo
            {...this.props}
            id={routeInfo.match.params.id}
            offer={offer}
          />
        )
      } else {
        return null
      }
    }

    const RequestInfoPane = routeInfo => {
      if (this.props.requests) {
        const request = this.props.requests[routeInfo.match.params.id]

        return (
          <RequestInfo
            {...this.props}
            id={routeInfo.match.params.id}
            request={request}
          />
        )
      } else {
        return null
      }
    }

    const CreateProjectPane = routeInfo => {
      return <CreateProject onCreateProject={this.props.onCreateProject} />
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
          to="/create-project"
        >
          <AddIcon />
        </Button>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Tabs value={tabNum} onChange={this.onTabChanged}>
              {TAB_NAMES.map((name, idx) => <Tab key={idx} label={name} />)}
            </Tabs>
            {this.renderTab()}
          </Grid>
          <Grid xs={12} sm={7} item>
            <Route path="/projects/:id" render={ProjectInfoPane} />
            <Route path="/offers/:id" render={OfferInfoPane} />
            <Route path="/requests/:id" render={RequestInfoPane} />
            <Route path="/create-project" render={CreateProjectPane} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

TabbedList.propTypes = {
  authenticated: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired
}

export default withStyles(styles)(TabbedList)
