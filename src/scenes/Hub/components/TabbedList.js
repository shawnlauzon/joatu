import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

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

  onTabChanged = (event, value) => {
    this.setState({ tabNum: value })
  }

  currentTab = () => this.props.children[this.state.tabNum]

  render() {
    const { classes, authenticatedUser, hub } = this.props
    const { tabNum } = this.state

    return (
      <div>
        <Button
          variant="fab"
          className={classes.fab}
          color="primary"
          aria-label="add"
          disabled={!authenticatedUser || authenticatedUser.homeHub !== hub.id}
          component={Link}
          to={this.currentTab().props.createUrl}
        >
          <AddIcon />
        </Button>
        <Tabs value={tabNum} onChange={this.onTabChanged}>
          {this.props.children.map((tab, idx) => (
            <Tab
              component={Link}
              to={tab.props.viewUrl}
              key={idx}
              label={tab.props.tabName}
            />
          ))}
        </Tabs>
        {this.currentTab()}
      </div>
    )
  }
}

TabbedList.propTypes = {
  authenticatedUser: PropTypes.object,
  hub: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}

export default withStyles(styles)(TabbedList)
