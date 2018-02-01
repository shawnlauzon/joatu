import React from 'react'
import { Route } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'

import ProjectDetail from '../ProjectDetail'
import ProjectList from './components/ProjectList'
import TradeList from './components/TradeList'

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

    // Needed to pass our additional props
    // TODO Should not be needed with Redux
    const ProjectDetailPane = (props) => {
      return (
        <ProjectDetail projects={this.props.projects} users={this.props.users}
          {...props}
        />
      )
    }

    return (
      <div>
        <Grid container>
          <Grid item sm={6}>
            <Tabs value={tabNum} onChange={this.onTabChanged}>
              {/* TODO Get these labels from the children */}
              <Tab label='Projects' />
              <Tab label='Trades' />
            </Tabs>
            {tabNum === 0
              ? <ProjectList projects={this.props.projects} />
              : <TradeList trades={this.props.trades} />
            }
          </Grid>
          <Grid item xs hidden={{ xsDown: true }}>
            <Route path='/projects/:id' render={ProjectDetailPane} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default OfferList
