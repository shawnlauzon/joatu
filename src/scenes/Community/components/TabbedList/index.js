import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

// TODO Move these to the tab entries
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

  onTabChanged = (event, value) => {
    this.setState({ tabNum: value })
  }

  render() {
    const { classes } = this.props
    const { tabNum } = this.state

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
        {this.props.children[this.state.tabNum]}
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
