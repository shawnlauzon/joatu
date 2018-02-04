import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import LoginModal from '../LoginModal'

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class JoatUAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoginShowing: false
    }
  }

  handleLogin = e => {
    this.setState({ showLogin: true })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              The Jack of all Trades Universe
            </Typography>
            <Button color="inherit" onClick={this.handleLogin}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <LoginModal show={this.state.showLogin} />
      </div>
    )
  }
}

JoatUAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(JoatUAppBar)
