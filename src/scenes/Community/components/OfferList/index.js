import React from 'react'
import { Route } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'

import ProjectList from './components/ProjectList'
import TradeList from './components/TradeList'
import ProjectDetail from '../ProjectDetail'
import TradeDetail from '../TradeDetail'

const TAB_NAMES = [ 'Projects', 'Trades' ]

class OfferList extends React.Component {
  constructor () {
    super()
    this.state = {
      tabNum: 0
    }

    this.onTabChanged = (event, value) => {
      this.setState({ tabNum: value })
    }
  }

  render () {
    const { tabNum } = this.state

    const ProjectDetailPane = (routeInfo) => {
      const project = this.props.projects[routeInfo.match.params.id]

      return (
        <ProjectDetail project={project} users={this.props.users} />
      )
    }

    const TradeDetailPane = (routeInfo) => {
      const trade = this.props.trades[routeInfo.match.params.id]

      return (
        <TradeDetail trade={trade} users={this.props.users} />
      )
    }

    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Tabs value={tabNum} onChange={this.onTabChanged}>
              {TAB_NAMES.map(name => <Tab label={name} />)}
            </Tabs>
            {tabNum === 0
              ? <ProjectList projects={this.props.projects} />
              : <TradeList trades={this.props.trades} />
            }
          </Grid>
          <Grid xs={12} sm={8} item>
            {tabNum === 0
              ? <Route path='/projects/:id' render={ProjectDetailPane} />
              : <Route path='/trades/:id' render={TradeDetailPane} />
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default OfferList
