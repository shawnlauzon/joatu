import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'

import LoginModal from './LoginModal'

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
      loginModalOpen: false,
      anchorEl: null
    }
  }

  showLoginModal = e => {
    this.setState({ loginModalOpen: true })
  }

  handleLogin = provider => {
    this.handleLoginModalClose()
    this.props.onLogin(provider)
  }

  handleLoginModalClose = () => {
    this.setState({ loginModalOpen: false })
  }

  showLogoutModal = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleLogout = () => {
    this.props.onLogout()
    this.handleLogoutModalClose()
  }

  handleLogoutModalClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const openLogoutModal = Boolean(anchorEl)

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
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Hidden xsDown>
                The Jack of all Trades Universe DEVELOPMENT
              </Hidden>
              <Hidden smUp>JoatU DEVELOPMENT</Hidden>
            </Typography>
            {this.props.authenticatedUser ? (
              <div>
                <Avatar
                  alt={this.props.authenticatedUser.displayName}
                  src={this.props.authenticatedUser.imgUrl}
                  aria-owns={openLogoutModal ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.showLogoutModal}
                />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={openLogoutModal}
                  onClose={this.handleLogoutModalClose}
                >
                  <MenuItem
                    component={Link}
                    to={`/profiles/${this.props.authenticatedUser.id}`}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" onClick={this.showLoginModal}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <LoginModal
          onLogin={this.handleLogin}
          onClose={this.handleLoginModalClose}
          open={this.state.loginModalOpen}
        />
      </div>
    )
  }
}

JoatUAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticatedUser: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default withStyles(styles)(JoatUAppBar)
