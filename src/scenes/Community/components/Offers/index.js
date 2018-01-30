import React from 'react'
import { Route } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'

import ProjectDetail from '../ProjectDetail'

class Offers extends React.Component {
  constructor () {
    super()
    this.state = {
      value: 0
    }

    this.handleChange = (event, value) => {
      this.setState({ value })
    }
  }

  render () {
    const { value } = this.state

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
            <Tabs value={value} onChange={this.handleChange}>
              {/* TODO Get these labels from the children */}
              <Tab label='Projects' />
              <Tab label='Trades' />
            </Tabs>
            {this.props.children[value]}
          </Grid>
          <Grid item sm>
            <Route path='/projects/:id' render={ProjectDetailPane} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Offers
