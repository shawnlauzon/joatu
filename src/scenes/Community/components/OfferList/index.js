import React from 'react'
import { Link, Route } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

import ProjectList from './components/ProjectList'
import TradeList from './components/TradeList'
import ProjectInfo from '../ProjectInfo'
import TradeDetail from '../TradeDetail'
import CreateOffer from '../../scenes/CreateOffer'

const TAB_NAMES = ['Projects', 'Trades']

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

class OfferList extends React.Component {
  constructor() {
    super()

    this.state = {
      tabNum: 0
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

    const TradeDetailPane = routeInfo => {
      if (this.props.trades) {
        const trade = this.props.trades[routeInfo.match.params.id]

        return (
          <TradeDetail
            {...this.props}
            id={routeInfo.match.params.id}
            trade={trade}
          />
        )
      } else {
        return null
      }
    }

    const CreateOfferPane = routeInfo => {
      return <CreateOffer onCreateProject={this.props.onCreateProject} />
    }

    return (
      <div>
        <Button
          fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          disabled={!this.props.user.authenticated}
          component={Link}
          to="/create-project"
        >
          <AddIcon />
        </Button>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Tabs value={tabNum} onChange={this.onTabChanged}>
              {TAB_NAMES.map((name, idx) => <Tab key={idx} label={name} />)}
            </Tabs>
            {tabNum === 0 ? (
              <ProjectList projects={this.props.projects} />
            ) : (
              <TradeList trades={this.props.trades} />
            )}
          </Grid>
          <Grid xs={12} sm={8} item>
            <Route path="/projects/:id" render={ProjectInfoPane} />
            <Route path="/trades/:id" render={TradeDetailPane} />
            <Route path="/create-project" render={CreateOfferPane} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(OfferList)
